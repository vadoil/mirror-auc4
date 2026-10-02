import * as React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import nodemailer from 'npm:nodemailer@6.9.14'
import { TEMPLATES } from './transactional-email-templates/registry.ts'

const SMTP_HOST = Deno.env.get('SMTP_HOST') ?? 'smtp.beget.com'
const SMTP_PORT = Number(Deno.env.get('SMTP_PORT') ?? '465')
const SMTP_USER = Deno.env.get('SMTP_USER')!
const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD')!
const SMTP_FROM_NAME = Deno.env.get('SMTP_FROM_NAME') ?? 'Отражение добра'

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
})

const htmlToText = (html: string) =>
  html
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

export async function sendTemplate(templateName: string, to: string, data: Record<string, unknown>) {
  const template = TEMPLATES[templateName]
  if (!template) throw new Error(`Template '${templateName}' not found`)
  const subject = typeof template.subject === 'function' ? template.subject(data as Record<string, any>) : template.subject
  const html = await renderAsync(React.createElement(template.component, data as any))
  await transporter.sendMail({
    from: { name: SMTP_FROM_NAME, address: SMTP_USER },
    to,
    replyTo: SMTP_USER,
    subject,
    html,
    text: htmlToText(html),
    encoding: 'base64',
    textEncoding: 'base64',
    headers: { 'Content-Language': 'ru' },
  })
}

export async function notifyOrganizers(text: string) {
  const token = Deno.env.get('TELEGRAM_BOT_TOKEN')
  const chatId = Deno.env.get('TELEGRAM_CHAT_ID')
  if (!token || !chatId) return
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
  }).catch((e) => console.error('[wellness] telegram failed', e))
}

export const escapeHtml = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
