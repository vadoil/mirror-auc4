import * as React from 'npm:react@18.3.1'
import type { TemplateEntry } from './registry.ts'
import { Shell, Hero, Paragraph, Ticket, Actions, ProgramTeaser, SignOff } from './wellness-shell.tsx'

interface Props {
  name?: string
  training?: string | null
  kind?: 'week' | 'day'
}

const WellnessReminderEmail = ({ name, training, kind = 'week' }: Props) => {
  const isDay = kind === 'day'
  return (
    <Shell preview={isDay ? 'Завтра — велнес-девичник «Отражение»' : 'Через неделю — велнес-девичник «Отражение»'}>
      <Hero
        kicker={isDay ? 'Уже завтра' : 'Через неделю'}
        title={name ? `${name}, ${isDay ? 'ждём вас' : 'до девичника'}` : isDay ? 'Ждём вас' : 'До девичника'}
        accent={isDay ? 'завтра!' : 'одна неделя.'}
      />
      <Paragraph>
        {isDay
          ? 'Завтра велнес-девичник «Отражение». Возьмите удобную одежду, если записались на тренировку, и приходите чуть заранее — так вы успеете всё посмотреть.'
          : 'Напоминаем: 25 октября велнес-девичник «Отражение» — лекции врачей, тренировки, beauty-девайсы и практики. Сохраните дату в календаре.'}
      </Paragraph>
      <Ticket name={name} training={training} />
      <Actions />
      {!isDay && <ProgramTeaser />}
      <SignOff>{isDay ? 'До встречи завтра!' : 'Скоро увидимся!'}</SignOff>
    </Shell>
  )
}

export const template = {
  component: WellnessReminderEmail,
  subject: (d: Record<string, any>) =>
    d.kind === 'day' ? 'Завтра — велнес-девичник «Отражение» ✦' : 'Через неделю — велнес-девичник «Отражение» ✦',
  displayName: 'Велнес-девичник: напоминание',
  previewData: { name: 'Мария', training: 'abs', kind: 'day' },
} satisfies TemplateEntry
