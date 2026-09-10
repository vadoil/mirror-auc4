import * as React from 'npm:react@18.3.1'
import { Heading, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
import { EmailLayout, InfoCard, Cta, SITE_URL, SITE_NAME, h1, p, signOff } from './layout.tsx'

interface Props {
  name?: string
  ticketType?: string
  promoCode?: string
}

function getContent(ticketType?: string) {
  const t = ticketType || ''
  const hi = (word: string) => (name?: string) => (name ? `${name}, ${word}` : word[0].toUpperCase() + word.slice(1))

  if (t === 'Задать вопрос') {
    return {
      subject: 'Ваш вопрос получен — Отражение добра',
      preview: 'Мы получили ваш вопрос и скоро ответим',
      heading: hi('спасибо за вопрос!'),
      body: 'Мы получили ваше сообщение и ответим в ближайшее время. Обычно это занимает не больше одного рабочего дня.',
      rowLabel: 'Ваше обращение',
      cta: null,
    }
  }
  if (t.includes('Пожертвование')) {
    return {
      subject: 'Спасибо за поддержку — Отражение добра',
      preview: 'Мы получили вашу заявку на пожертвование',
      heading: hi('спасибо за поддержку!'),
      body: 'Мы получили вашу заявку на пожертвование в фонд «Не напрасно». Если оплата ещё не завершена, организатор свяжется с вами и поможет.',
      rowLabel: 'Назначение',
      cta: { href: `${SITE_URL}/upcoming#donation`, text: 'Поддержать фонд' },
    }
  }
  if (t.includes('форум')) {
    return {
      subject: 'Форум «Отражение» — заявка принята',
      preview: 'Мы получили вашу заявку по форуму «Отражение»',
      heading: hi('спасибо за интерес!'),
      body: 'Мы получили вашу заявку по форуму «Отражение». Организатор свяжется с вами, когда откроется регистрация и появятся детали.',
      rowLabel: 'Ваша заявка',
      cta: { href: `${SITE_URL}/forum`, text: 'О форуме' },
    }
  }
  return {
    subject: 'Заявка принята — Отражение добра',
    preview: 'Мы получили вашу заявку',
    heading: hi('спасибо за заявку!'),
    body: 'Мы получили вашу заявку на участие в аукционе «Отражение добра». Организатор свяжется с вами и расскажет о ближайших событиях.',
    rowLabel: 'Ваша заявка',
    cta: { href: SITE_URL, text: 'На сайт' },
  }
}

const TicketRequestConfirmationEmail = ({ name, ticketType, promoCode }: Props) => {
  const c = getContent(ticketType)
  const rows = [{ label: c.rowLabel, value: ticketType || 'Участие в аукционе' }]
  if (promoCode) rows.push({ label: 'Промокод', value: `${promoCode} — участие без оплаты` })
  return (
    <EmailLayout preview={c.preview}>
      <Heading style={h1}>{c.heading(name)}</Heading>
      <Text style={p}>{c.body}</Text>
      <InfoCard rows={rows} />
      {c.cta && <Cta href={c.cta.href}>{c.cta.text}</Cta>}
      <Text style={signOff}>С теплом, команда «{SITE_NAME}»</Text>
    </EmailLayout>
  )
}

export const template = {
  component: TicketRequestConfirmationEmail,
  subject: (data: Record<string, any>) => getContent(data.ticketType).subject,
  displayName: 'Подтверждение заявки (клиенту)',
  previewData: { name: 'Мария', ticketType: 'Участник аукциона', promoCode: 'ДРУГ' },
} satisfies TemplateEntry
