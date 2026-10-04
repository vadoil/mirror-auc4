import * as React from 'npm:react@18.3.1'
// renderAsync из @react-email 0.0.22 режет UTF-8 на границах чанков потока (кириллица → «��»),
// поэтому рендерим синхронно через react-dom.
import { renderToStaticMarkup } from 'npm:react-dom@18.3.1/server'
import nodemailer from 'npm:nodemailer@6.9.14'
import { TEMPLATES } from './transactional-email-templates/registry.ts'

const XHTML_DOCTYPE =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'

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
  const html = XHTML_DOCTYPE + renderToStaticMarkup(React.createElement(template.component, data as any))
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
  // Соединение с api.telegram.org с сервера иногда рвётся (connection reset) — пробуем до 3 раз
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
        signal: AbortSignal.timeout(8000),
      })
      if (res.ok) return
      console.error('[wellness] telegram status', res.status)
    } catch (e) {
      // без URL в логе — в нём токен бота
      console.error(`[wellness] telegram attempt ${attempt} failed:`, (e as Error).name)
    }
    if (attempt < 3) await new Promise((r) => setTimeout(r, 1500 * attempt))
  }
}

export const escapeHtml = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
