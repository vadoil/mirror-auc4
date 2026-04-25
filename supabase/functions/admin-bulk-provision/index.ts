// One-shot helper: re-sends login/password to 4 specific clients who registered
// with promo "ДРУГ" while emails were temporarily disabled.
// Public (no auth) but hardcoded list — safe single-use.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TARGETS = [
  { email: "olgagrecohr@gmail.com", name: "Ольга" },
  { email: "pavelrum@gmail.com", name: "Павел Румянцев" },
  { email: "msinkareva@gmail.com", name: "Мария" },
  { email: "olegyachtlife@gmail.com", name: "Олег" },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const results: Array<{ email: string; status: number; body: string }> = [];

  for (const t of TARGETS) {
    try {
      const r = await fetch(`${SUPABASE_URL}/functions/v1/provision-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SERVICE_KEY}`,
          "apikey": SERVICE_KEY,
        },
        body: JSON.stringify({ email: t.email, name: t.name, force: true }),
      });
      const text = await r.text();
      results.push({ email: t.email, status: r.status, body: text.slice(0, 300) });
    } catch (e) {
      results.push({ email: t.email, status: 0, body: String(e) });
    }
  }

  return new Response(JSON.stringify({ results }, null, 2), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
