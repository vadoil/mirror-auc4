import * as React from 'npm:react@18.3.1'
import type { TemplateEntry } from './registry.ts'
import { Shell, Hero, Paragraph, SignOff, Button, IMG, RED, INK, MUTED, BLUSH } from './wellness-shell.tsx'
import { IGRISTOE_EVENT as E } from './igristoe-event.ts'

const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const SERIF = "Georgia, 'Times New Roman', serif"

const calendarUrl = () =>
  `https://calendar.google.com/calendar/render?${new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Игристое со стилистом · Voluminous',
    dates: E.calendarDates,
    details: `Стилист ${E.stylist}. Часть средств — в фонд «Не напрасно». ${E.pageUrl}`,
    location: `${E.place}, ${E.address}`,
  }).toString()}`
const mapUrl = () => `https://yandex.ru/maps/?text=${encodeURIComponent(E.address)}`

const Details = ({ name }: { name?: string }) => (
  <tr>
    <td style={{ padding: '28px 28px 0' }}>
      <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ background: BLUSH, borderRadius: 16 }}>
        <tbody>
          <tr>
            <td style={{ padding: '22px 24px' }}>
              <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: 3, color: RED, textTransform: 'uppercase', margin: '0 0 6px' }}>Приглашение</p>
              {name && <p style={{ fontFamily: SERIF, fontSize: 24, color: INK, margin: '0 0 12px' }}>{name}</p>}
              <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
                <tbody>
                  {[
                    ['Когда', `${E.dateLabel}, ${E.timeLabel}`],
                    ['Где', `${E.place} · ${E.address}`],
                    ['Стилист', E.stylist],
                    ['Вход', 'свободный, по записи'],
                  ].map(([k, v]) => (
                    <tr key={k}>
                      <td valign="top" style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: MUTED, padding: '5px 12px 5px 0', width: 90 }}>{k}</td>
                      <td style={{ fontFamily: SANS, fontSize: 14, color: INK, padding: '5px 0' }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
)

const About = () => (
  <Paragraph>
    {'Обновляем гардероб к осенне-зимнему сезону. Известный стилист и команда бренда Voluminous помогут выбрать обновки и стилизовать любимую вещь, которая давно ждёт своего часа. Приятная компания, игристое и много-много дофамина — обещаем! Часть средств пойдёт в фонд «Не напрасно», который занимается системной профилактикой рака.'}
  </Paragraph>
)

type Kind = 'confirm' | 'reminder' | 'invite'

const IgristoeEmail = ({ name, kind = 'confirm' }: { name?: string; kind?: Kind }) => {
  const hero = {
    confirm: { kicker: 'Вы записаны', title: name ? `${name}, ждём вас` : 'Ждём вас', accent: 'на игристое со стилистом.' },
    reminder: { kicker: 'Уже завтра', title: name ? `${name}, завтра` : 'Завтра', accent: 'игристое со стилистом!' },
    invite: { kicker: 'Накануне девичника', title: 'Игристое', accent: 'со стилистом.' },
  }[kind]
  return (
    <Shell preview={kind === 'invite' ? 'Приглашаем на «Игристое со стилистом» — 24 октября, Voluminous' : `Игристое со стилистом — ${E.dateLabel}, ${E.timeLabel}`}>
      <Hero kicker={hero.kicker} title={hero.title} accent={hero.accent} dateLine="Москва · 24 октября · 14:00–19:00" image={`${IMG}/igristoe.jpg`} />
      {kind === 'invite' && name && <Paragraph>{`${name}, вы с нами на девичнике 25 октября — а накануне приглашаем вас на тёплое благотворительное событие.`}</Paragraph>}
      <About />
      <Details name={kind === 'invite' ? undefined : name} />
      <tr>
        <td style={{ padding: '24px 36px 0' }}>
          {kind === 'invite' ? (
            <>
              <Button href={E.pageUrl} primary>{'Записаться'}</Button>
              <Button href={mapUrl()}>{'Как добраться'}</Button>
            </>
          ) : (
            <>
              <Button href={calendarUrl()} primary>{'В календарь'}</Button>
              <Button href={mapUrl()}>{'Как добраться'}</Button>
            </>
          )}
        </td>
      </tr>
      <SignOff>{kind === 'reminder' ? 'До встречи завтра!' : 'С любовью, команда «Отражения»'}</SignOff>
    </Shell>
  )
}

export const template = {
  component: IgristoeEmail,
  subject: (d: Record<string, any>) =>
    d.kind === 'reminder'
      ? 'Завтра — игристое со стилистом ✦ Voluminous, 14:00–19:00'
      : d.kind === 'invite'
        ? 'Приглашаем на «Игристое со стилистом» ✦ 24 октября'
        : 'Вы записаны ✦ Игристое со стилистом, 24 октября',
  displayName: 'Игристое со стилистом: запись / напоминание / приглашение',
  previewData: { name: 'Мария', kind: 'confirm' },
} satisfies TemplateEntry
