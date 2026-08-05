import * as React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { TEMPLATES } from '../_shared/transactional-email-templates/registry.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SMTP_HOST = Deno.env.get('SMTP_HOST') ?? 'smtp.beget.com'
const SMTP_PORT = Number(Deno.env.get('SMTP_PORT') ?? '465')
const SMTP_USER = Deno.env.get('SMTP_USER')!
const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD')!
const SMTP_FROM_NAME = Deno.env.get('SMTP_FROM_NAME') ?? 'Отражение добра'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  try {
    const body = await req.json().catch(() => ({}))
    const templateName: string | undefined = body.templateName || body.template_name
    const recipientEmail: string | undefined = body.recipientEmail || body.recipient_email
    const templateData: Record<string, unknown> = body.templateData ?? {}

    let subject: string = body.subject ?? ''
    let html: string = body.html ?? ''

    if (templateName) {
      const template = TEMPLATES[templateName]
      if (!template) {
        return json(
          { error: `Template '${templateName}' not found. Available: ${Object.keys(TEMPLATES).join(', ')}` },
          404,
        )
      }
      subject =
        typeof template.subject === 'function'
          ? template.subject(templateData as Record<string, any>)
          : template.subject
      html = await renderAsync(React.createElement(template.component, templateData as any))
    }

    const to = TEMPLATES[templateName ?? '']?.to || recipientEmail
    if (!to) return json({ error: 'recipientEmail is required' }, 400)
    if (!html) return json({ error: 'html or templateName is required' }, 400)

    const client = new SMTPClient({
      connection: {
        hostname: SMTP_HOST,
        port: SMTP_PORT,
        tls: SMTP_PORT === 465,
        auth: { username: SMTP_USER, password: SMTP_PASSWORD },
      },
    })

    await client.send({
      from: `${SMTP_FROM_NAME} <${SMTP_USER}>`,
      to,
      replyTo: SMTP_USER,
      subject: subject || 'Отражение добра',
      html,
    })
    await client.close()

    // Best-effort logging
    try {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      )
      await supabase.from('email_send_log').insert({
        message_id: body.idempotencyKey || crypto.randomUUID(),
        template_name: templateName ?? 'raw-html',
        recipient_email: to,
        status: 'sent',
        metadata: { transport: 'smtp' },
      })
    } catch (_) {
      // ignore logging failures
    }

    console.log('[send-email-smtp] sent', { to, templateName })
    return json({ success: true, to, templateName: templateName ?? null })
  } catch (e) {
    console.error('[send-email-smtp] error:', e)
    return json({ error: String((e as Error).message ?? e) }, 500)
  }
})
