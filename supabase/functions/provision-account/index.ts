import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

function generatePassword(): string {
  // 6-digit numeric password
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return String(buf[0] % 1_000_000).padStart(6, "0");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email ?? "").trim().toLowerCase();
    const name = body.name ? String(body.name).trim() : undefined;
    const force = Boolean(body.force);
    const promoCode = body.promo_code ? String(body.promo_code).trim() : "";

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Authorization: service-role secret, admin JWT, or valid active promo code
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    const isServiceCall = token && token === SERVICE_KEY;
    const adminCheck = createClient(SUPABASE_URL, SERVICE_KEY);

    let authorized = isServiceCall;

    if (!authorized && token) {
      const { data: userData } = await adminCheck.auth.getUser(token);
      if (userData?.user?.id) {
        const { data: isAdmin } = await adminCheck.rpc("has_role", {
          _user_id: userData.user.id,
          _role: "admin",
        });
        if (isAdmin) authorized = true;
      }
    }

    if (!authorized && promoCode) {
      const { data: promo } = await adminCheck
        .from("promo_codes")
        .select("id, is_active, max_uses, current_uses")
        .ilike("code", promoCode)
        .eq("is_active", true)
        .maybeSingle();
      if (promo && (promo.max_uses == null || promo.current_uses < promo.max_uses)) {
        authorized = true;
      }
    }

    if (!authorized) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Check if user exists by email (paginate auth.users)
    let existingUser: { id: string; email?: string } | null = null;
    let page = 1;
    while (page <= 20) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
      if (error) throw error;
      const found = data.users.find(
        (u) => (u.email ?? "").toLowerCase() === email
      );
      if (found) {
        existingUser = { id: found.id, email: found.email ?? undefined };
        break;
      }
      if (data.users.length < 200) break;
      page++;
    }

    let action: "created" | "password_reset" | "skipped" = "skipped";
    let password: string | null = null;

    if (!existingUser) {
      password = generatePassword();
      const { data, error } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: name ? { name } : undefined,
      });
      if (error) throw error;
      action = "created";
      console.log("[provision-account] created user", data.user?.id, email);
    } else if (force) {
      password = generatePassword();
      const { error } = await admin.auth.admin.updateUserById(existingUser.id, {
        password,
      });
      if (error) throw error;
      action = "password_reset";
      console.log("[provision-account] reset password for", existingUser.id, email);
    } else {
      console.log("[provision-account] user already exists, skipping:", email);
      return new Response(
        JSON.stringify({ ok: true, action: "skipped", email }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send credentials email
    const { error: mailErr } = await admin.functions.invoke(
      "send-transactional-email",
      {
        body: {
          templateName: "account-credentials",
          recipientEmail: email,
          idempotencyKey: `account-credentials-${email}-${Date.now()}`,
          templateData: { name, email, password },
        },
      }
    );
    if (mailErr) {
      console.error("[provision-account] email send error:", mailErr);
    }

    // Return password so admin can send credentials manually if auto-email fails
    return new Response(
      JSON.stringify({ ok: true, action, email, password }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("[provision-account] error:", e);
    return new Response(
      JSON.stringify({ ok: false, error: String((e as Error).message ?? e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
