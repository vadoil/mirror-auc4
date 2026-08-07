import * as React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import nodemailer from 'npm:nodemailer@6.9.14'
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

function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|tr|h1|h2|h3|td)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

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

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    })

    const info = await transporter.sendMail({
      from: { name: SMTP_FROM_NAME, address: SMTP_USER },
      to,
      replyTo: SMTP_USER,
      subject: subject || 'Отражение добра',
      html,
      text: htmlToText(html),
      // base64 keeps multi-byte Cyrillic intact (quoted-printable line wraps
      // could split a UTF-8 sequence and produce "??" glyphs)
      encoding: 'base64',
      textEncoding: 'base64',
      headers: {
        'Content-Language': 'ru',
      },
    })

    // Best-effort logging
    try {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      )
      await supabase.from('email_send_log').insert({
        message_id: body.idempotencyKey || info?.messageId || crypto.randomUUID(),
        template_name: templateName ?? 'raw-html',
        recipient_email: to,
        status: 'sent',
        metadata: { transport: 'smtp-nodemailer' },
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
