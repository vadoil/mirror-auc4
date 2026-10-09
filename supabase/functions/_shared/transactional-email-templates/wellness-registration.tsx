import * as React from 'npm:react@18.3.1'
import type { TemplateEntry } from './registry.ts'
import { Shell, Hero, Paragraph, Ticket, Actions, ProgramTeaser, Gallery, SignOff } from './wellness-shell.tsx'

interface Props {
  name?: string
  trainings?: string[] | null
  position?: number
  amount?: number
}

// Приглашение после оплаты регистрации
const WellnessRegistrationEmail = ({ name, trainings, position, amount }: Props) => (
  <Shell preview="Вы в списке гостей велнес-девичника «Отражение» — 25 октября, Москва">
    <Hero kicker="Велнес-девичник для женщин" title={name ? `${name}, вы в списке` : 'Вы в списке'} accent="гостей «Отражения»." />
    <Paragraph>
      {'Спасибо за регистрацию! 25 октября — день, полностью посвящённый заботе о себе: лекции врачей, тренировки, beauty-девайсы, практики, healthy-бар и тёплое женское комьюнити.'}
    </Paragraph>
    <Ticket name={name} position={position} trainings={trainings} amount={amount} />
    <Actions />
    <ProgramTeaser />
    <Gallery />
    <Paragraph>
      {'Мы напомним о девичнике за неделю и накануне. Ваш взнос будет направлен в поддержку фонда «Не напрасно» — спасибо, что вы с нами!'}
    </Paragraph>
    <SignOff>{'До встречи 25 октября!'}</SignOff>
  </Shell>
)

export const template = {
  component: WellnessRegistrationEmail,
  subject: 'Вы приглашены ✦ велнес-девичник «Отражение», 25 октября',
  displayName: 'Велнес-девичник: приглашение после оплаты',
  previewData: { name: 'Мария', trainings: ['libido', 'bowls'], position: 12, amount: 440 },
} satisfies TemplateEntry
