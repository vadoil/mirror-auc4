/// <reference types="npm:@types/react@18.3.1" />
// Оформление писем велнес-девичника: тёплый молочный фон, красный акцент, курсив с засечками —
// как на странице /wellness и в презентации. Вёрстка таблицами и inline-стилями (почтовые клиенты).
import * as React from 'npm:react@18.3.1'
import { WELLNESS_EVENT, TRAININGS } from './wellness-event.ts'

export const SITE = 'https://xn--80aodvkjc9f.xn--p1ai'
export const IMG = `${SITE}/email`
export const RED = '#E02020'
export const INK = '#1F1D1B'
export const MUTED = '#6B6864'
export const CREAM = '#F7F3EF'
export const BLUSH = '#FBE9E7'
export const LINE = '#ECE6DF'

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif"

const calendarUrl = () => {
  const q = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Велнес-девичник «Отражение»',
    dates: '20261025/20261026',
    details: `Программа: ${WELLNESS_EVENT.pageUrl}`,
    location: `${WELLNESS_EVENT.place}, ${WELLNESS_EVENT.address}`,
  })
  return `https://calendar.google.com/calendar/render?${q.toString()}`
}
const mapUrl = () => `https://yandex.ru/maps/?text=${encodeURIComponent(WELLNESS_EVENT.address)}`

export const Shell = ({ preview, children }: { preview: string; children: React.ReactNode }) => (
  <html lang="ru">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="color-scheme" content="light" />
    </head>
    <body style={{ margin: 0, padding: 0, background: CREAM }}>
      {/* текст превью в списке писем */}
      <div style={{ display: 'none', maxHeight: 0, overflow: 'hidden', opacity: 0 }}>{preview}</div>
      <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ background: CREAM }}>
        <tbody>
          <tr>
            <td align="center" style={{ padding: '24px 12px' }}>
              <table role="presentation" width={600} cellPadding={0} cellSpacing={0} style={{ width: '100%', maxWidth: 600, background: '#FFFFFF', borderRadius: 20, overflow: 'hidden' }}>
                <tbody>{children}</tbody>
              </table>
              <p style={{ fontFamily: SANS, fontSize: 11, color: MUTED, lineHeight: 1.6, margin: '20px 0 0', maxWidth: 520 }}>
                {'В поддержку «Розового октября» — месяца профилактики рака груди. Фонд «Не напрасно»: просвещение, профилактика рака и подготовка врачей-онкологов.'}
                <br />
                {'Вопросы? Просто ответьте на это письмо · '}
                <a href={SITE} style={{ color: MUTED }}>отразись.рф</a>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
)

export const Hero = ({
  kicker,
  title,
  accent,
  dateLine = 'Москва · 25 октября 2026',
  image = `${IMG}/wellness-hero.jpg`,
}: {
  kicker: string
  title: string
  accent: string
  dateLine?: string
  image?: string
}) => (
  <>
    <tr>
      <td style={{ padding: '28px 36px 0' }}>
        <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr>
              <td style={{ fontFamily: SERIF, fontSize: 18, letterSpacing: 4, color: INK }}>ОТРАЖЕНИЕ</td>
              <td align="right" style={{ fontFamily: SANS, fontSize: 10, letterSpacing: 2, color: RED, textTransform: 'uppercase' }}>
                {dateLine}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td style={{ padding: '20px 20px 0' }}>
        <img src={image} width={560} alt="" style={{ display: 'block', width: '100%', maxWidth: 560, height: 'auto', borderRadius: 16, border: 0 }} />
      </td>
    </tr>
    <tr>
      <td style={{ padding: '28px 36px 0' }}>
        <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: 3, color: RED, textTransform: 'uppercase', margin: '0 0 12px' }}>{kicker}</p>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, lineHeight: 1.05, color: INK, margin: 0 }}>
          {title}
          <br />
          <span style={{ fontStyle: 'italic', color: RED }}>{accent}</span>
        </h1>
      </td>
    </tr>
  </>
)

export const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <tr>
    <td style={{ padding: '16px 36px 0', fontFamily: SANS, fontSize: 15, lineHeight: 1.65, color: '#3D3A36' }}>{children}</td>
  </tr>
)

/** «Билет»: перфорация пунктиром, номер гостьи, детали */
export const Ticket = ({ name, position, trainings, amount }: { name?: string; position?: number; trainings?: string[] | null; amount?: number }) => {
  const rows: [string, string][] = [
    ['Дата', WELLNESS_EVENT.timeLabel ? `${WELLNESS_EVENT.dateLabel}, ${WELLNESS_EVENT.timeLabel}` : WELLNESS_EVENT.dateLabel],
    ['Место', WELLNESS_EVENT.place],
    ['Адрес', WELLNESS_EVENT.address],
  ]
  const picked = (trainings ?? []).filter((t) => TRAININGS[t]).map((t) => TRAININGS[t])
  if (picked.length) rows.push([picked.length > 1 ? 'Тренировки' : 'Тренировка', picked.join(', ')])
  if (amount) rows.push(['Оплачено', `${amount} ₽`])
  return (
    <tr>
      <td style={{ padding: '28px 28px 0' }}>
        <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ background: BLUSH, borderRadius: 16 }}>
          <tbody>
            <tr>
              <td style={{ padding: '22px 24px', borderBottom: `2px dashed #F2C4BF` }}>
                <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
                  <tbody>
                    <tr>
                      <td>
                        <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: 3, color: RED, textTransform: 'uppercase', margin: '0 0 6px' }}>Приглашение</p>
                        <p style={{ fontFamily: SERIF, fontSize: 24, color: INK, margin: 0 }}>{name || 'Гостья девичника'}</p>
                      </td>
                      {position !== undefined && (
                        <td align="right" valign="top">
                          <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: 2, color: MUTED, textTransform: 'uppercase', margin: '0 0 2px' }}>Гостья</p>
                          <p style={{ fontFamily: SERIF, fontSize: 34, color: RED, margin: 0, lineHeight: 1 }}>№{position}</p>
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '18px 24px 22px' }}>
                <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
                  <tbody>
                    {rows.map(([k, v]) => (
                      <tr key={k}>
                        <td valign="top" style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: MUTED, padding: '5px 12px 5px 0', width: 110 }}>{k}</td>
                        <td style={{ fontFamily: SANS, fontSize: 14, color: INK, padding: '5px 0' }}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {position !== undefined && position <= 60 && (
                  <p style={{ fontFamily: SANS, fontSize: 13, color: RED, margin: '14px 0 0' }}>
                    {'✦ Вы среди первых 60 гостей — место в лектории за вами.'}
                  </p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  )
}

export const Button = ({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) => (
  <a
    href={href}
    style={{
      display: 'inline-block',
      fontFamily: SANS,
      fontSize: 12,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      textDecoration: 'none',
      padding: '13px 20px',
      borderRadius: 999,
      margin: '0 6px 8px 0',
      background: primary ? RED : '#FFFFFF',
      color: primary ? '#FFFFFF' : INK,
      border: primary ? `1px solid ${RED}` : `1px solid ${LINE}`,
    }}
  >
    {children}
  </a>
)

export const Actions = () => (
  <tr>
    <td style={{ padding: '24px 36px 0' }}>
      <Button href={calendarUrl()} primary>{'В календарь'}</Button>
      <Button href={mapUrl()}>{'Как добраться'}</Button>
      <Button href={`${WELLNESS_EVENT.pageUrl}#program`}>{'Программа'}</Button>
    </td>
  </tr>
)

export const ProgramTeaser = () => (
  <tr>
    <td style={{ padding: '32px 36px 0' }}>
      <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: 3, color: RED, textTransform: 'uppercase', margin: '0 0 6px' }}>{'Лекторий · выступления врачей'}</p>
      <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          {[
            ['01', 'Маммология / пластическая хирургия', 'Виктория Мортада'],
            ['02', 'Гастроэнтерология: микробиота и женское здоровье', 'Анна Борисова'],
            ['03', 'Чек-ап: что проверять, чтобы быть спокойной', ''],
          ].map(([n, t, sp]) => (
            <tr key={n}>
              <td valign="top" style={{ fontFamily: SERIF, fontSize: 22, color: RED, padding: '12px 14px 12px 0', width: 36, borderBottom: `1px solid ${LINE}` }}>{n}</td>
              <td style={{ padding: '12px 0', borderBottom: `1px solid ${LINE}` }}>
                <p style={{ fontFamily: SERIF, fontSize: 17, color: INK, margin: 0 }}>{t}</p>
                {sp && <p style={{ fontFamily: SANS, fontSize: 12, color: MUTED, margin: '3px 0 0' }}>{sp}</p>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </td>
  </tr>
)

export const Gallery = () => (
  <tr>
    <td style={{ padding: '28px 30px 0' }}>
      <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            {['zone-1', 'zone-5', 'zone-6', 'zone-7'].map((z) => (
              <td key={z} width="25%" style={{ padding: '0 6px' }}>
                <img src={`${IMG}/${z}.jpg`} width={124} alt="" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 12, border: 0 }} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <p style={{ fontFamily: SANS, fontSize: 12, color: MUTED, textAlign: 'center', margin: '12px 0 0' }}>
        {'Бьюти-девайсы · healthy-бар · практики · женское здоровье — и ещё четыре зоны заботы'}
      </p>
    </td>
  </tr>
)

export const SignOff = ({ children }: { children: React.ReactNode }) => (
  <tr>
    <td style={{ padding: '32px 36px 36px' }}>
      <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, color: RED, margin: 0 }}>{children}</p>
      <p style={{ fontFamily: SANS, fontSize: 12, color: MUTED, margin: '6px 0 0' }}>{'Гизела Тольц и Александра Павлова, организаторы'}</p>
    </td>
  </tr>
)
