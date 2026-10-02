import * as React from 'npm:react@18.3.1'
import { Heading, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
import { EmailLayout, InfoCard, Cta, h1, p, signOff } from './layout.tsx'
import { WELLNESS_EVENT } from './wellness-event.ts'
import { eventRows } from './wellness-registration.tsx'

interface Props {
  name?: string
  training?: string | null
  kind?: 'week' | 'day'
}

const WellnessReminderEmail = ({ name, training, kind = 'week' }: Props) => {
  const isDay = kind === 'day'
  return (
    <EmailLayout preview={isDay ? 'Завтра — велнес-девичник «Отражение»' : 'Через неделю — велнес-девичник «Отражение»'}>
      <Heading style={h1}>
        {isDay
          ? (name ? `${name}, ждём вас завтра!` : 'Ждём вас завтра!')
          : (name ? `${name}, до девичника неделя` : 'До девичника неделя')}
      </Heading>
      <Text style={p}>
        {isDay
          ? 'Завтра велнес-девичник «Отражение». Возьмите удобную одежду, если записались на тренировку, и приходите чуть заранее — так вы успеете всё посмотреть.'
          : 'Напоминаем: 25 октября велнес-девичник «Отражение» — public talk, консультации врачей, beauty-девайсы и практики. Сохраните дату в календаре.'}
      </Text>
      <InfoCard rows={eventRows(training)} />
      <Cta href={WELLNESS_EVENT.pageUrl}>Программа девичника</Cta>
      <Text style={signOff}>С теплом, команда «Отражения»</Text>
    </EmailLayout>
  )
}

export const template = {
  component: WellnessReminderEmail,
  subject: (d: Record<string, any>) =>
    d.kind === 'day' ? 'Завтра — велнес-девичник «Отражение»' : 'Через неделю — велнес-девичник «Отражение»',
  displayName: 'Велнес-девичник: напоминание',
  previewData: { name: 'Мария', training: 'abs', kind: 'day' },
} satisfies TemplateEntry
