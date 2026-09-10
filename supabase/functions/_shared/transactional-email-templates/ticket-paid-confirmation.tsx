import * as React from 'npm:react@18.3.1'
import { Heading, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
import { EmailLayout, InfoCard, Cta, SITE_URL, SITE_NAME, h1, p, signOff } from './layout.tsx'

interface Props {
  name?: string
  ticketType?: string
  amount?: number
}

const TicketPaidConfirmationEmail = ({ name, ticketType, amount }: Props) => {
  const rows: { label: string; value: React.ReactNode }[] = []
  if (typeof amount === 'number' && amount > 0) rows.push({ label: 'Сумма', value: `${amount.toLocaleString('ru-RU')} ₽` })
  rows.push({ label: 'Назначение', value: ticketType || 'Благотворительное пожертвование' })
  return (
    <EmailLayout preview="Ваш платёж прошёл. Спасибо за поддержку фонда «Не напрасно»">
      <Heading style={h1}>{name ? `${name}, спасибо за пожертвование!` : 'Спасибо за пожертвование!'}</Heading>
      <Text style={p}>
        Ваш платёж прошёл. Средства направлены в фонд «Не напрасно» на помощь людям
        с онкологическими заболеваниями, раннюю диагностику и обучение врачей.
      </Text>
      <InfoCard rows={rows} />
      <Text style={p}>Это письмо подтверждает оплату. Если у вас есть вопросы, просто ответьте на него.</Text>
      <Cta href={SITE_URL}>На сайт</Cta>
      <Text style={signOff}>С теплом, команда «{SITE_NAME}»</Text>
    </EmailLayout>
  )
}

export const template = {
  component: TicketPaidConfirmationEmail,
  subject: 'Спасибо за пожертвование — Отражение добра',
  displayName: 'Благодарность за пожертвование (клиенту)',
  previewData: { name: 'Анна', ticketType: 'Пожертвование в фонд «Не напрасно»', amount: 3000 },
} satisfies TemplateEntry
