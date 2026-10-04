import * as React from 'npm:react@18.3.1'
import { Heading, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
import { EmailLayout, InfoCard, Cta, h1, p, signOff } from './layout.tsx'
import { WELLNESS_EVENT, TRAININGS } from './wellness-event.ts'

interface Props {
  name?: string
  training?: string | null
  position?: number
  amount?: number
}

export const eventRows = (training?: string | null) => {
  const rows: { label: string; value: string }[] = [
    { label: 'Когда', value: WELLNESS_EVENT.timeLabel ? `${WELLNESS_EVENT.dateLabel}, ${WELLNESS_EVENT.timeLabel}` : WELLNESS_EVENT.dateLabel },
    { label: 'Где', value: `${WELLNESS_EVENT.place} · ${WELLNESS_EVENT.address}` },
  ]
  if (training && TRAININGS[training]) rows.push({ label: 'Ваша тренировка', value: TRAININGS[training] })
  return rows
}

const WellnessRegistrationEmail = ({ name, training, position, amount }: Props) => (
  <EmailLayout preview="Вы зарегистрированы на велнес-девичник «Отражение» 25 октября">
    <Heading style={h1}>{name ? `${name}, вы в списке гостей!` : 'Вы в списке гостей!'}</Heading>
    <Text style={p}>
      Спасибо за регистрацию и оплату участия в велнес-девичнике «Отражение» — день, полностью посвящённый заботе о себе:
      public talk, консультации врачей, beauty-девайсы, практики и тёплое женское комьюнити.
    </Text>
    {position !== undefined && position <= 60 && (
      <Text style={p}>
        <b>Вы среди первых 60 гостей — место в лектории за вами гарантировано.</b>
      </Text>
    )}
    <InfoCard rows={[...eventRows(training), ...(amount ? [{ label: 'Оплачено', value: `${amount} ₽` }] : [])]} />
    <Text style={p}>
      Мы напомним о событии за неделю и накануне. Чек об оплате CloudPayments пришлёт отдельным письмом.
    </Text>
    <Cta href={WELLNESS_EVENT.pageUrl}>Программа девичника</Cta>
    <Text style={signOff}>До встречи 25 октября! Команда «Отражения»</Text>
  </EmailLayout>
)

export const template = {
  component: WellnessRegistrationEmail,
  subject: 'Вы зарегистрированы — велнес-девичник «Отражение», 25 октября',
  displayName: 'Велнес-девичник: подтверждение регистрации',
  previewData: { name: 'Мария', training: 'bowls', position: 12, amount: 440 },
} satisfies TemplateEntry
