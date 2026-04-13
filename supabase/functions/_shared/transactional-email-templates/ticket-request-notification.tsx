import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Отражение добра"
const PRIMARY_COLOR = "#E02020"
const DARK_BG = "#1E1E1E"
const CREAM = "#F5F5F0"

interface TicketRequestNotificationProps {
  name?: string
  email?: string
  phone?: string
  ticketType?: string
  message?: string
  promoCode?: string
}

const TicketRequestNotificationEmail = ({ name, email, phone, ticketType, message, promoCode }: TicketRequestNotificationProps) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Новая заявка на участие — {name || 'Без имени'}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header bar */}
        <Section style={headerBar}>
          <Text style={headerTitle}>ОТРАЖЕНИЕ ДОБРА</Text>
          <Text style={headerSubtitle}>Благотворительный аукцион · 26 апреля 2025</Text>
        </Section>

        <Section style={content}>
          <Heading style={h1}>Новая заявка на аукцион</Heading>
          <Text style={intro}>Получена новая регистрация на мероприятие. Детали ниже:</Text>

          <Section style={dataCard}>
            <Text style={label}>ИМЯ</Text>
            <Text style={value}>{name || '—'}</Text>

            <Hr style={divider} />

            <Text style={label}>EMAIL</Text>
            <Text style={value}>{email || '—'}</Text>

            <Hr style={divider} />

            <Text style={label}>ТЕЛЕФОН</Text>
            <Text style={value}>{phone || '—'}</Text>

            <Hr style={divider} />

            <Text style={label}>ТИП БИЛЕТА</Text>
            <Text style={value}>{ticketType || '—'}</Text>

            {promoCode && (
              <>
                <Hr style={divider} />
                <Text style={label}>ПРОМОКОД</Text>
                <Text style={{ ...value, color: '#16a34a' }}>✓ {promoCode}</Text>
              </>
            )}

            {message && (
              <>
                <Hr style={divider} />
                <Text style={label}>КОММЕНТАРИЙ</Text>
                <Text style={value}>{message}</Text>
              </>
            )}
          </Section>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>{SITE_NAME} · Благотворительный аукцион в пользу фонда «Не напрасно»</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: TicketRequestNotificationEmail,
  subject: (data: Record<string, any>) => `Новая заявка: ${data.name || 'участник'} — ${data.ticketType || 'билет'}`,
  displayName: 'Уведомление о заявке на билет',
  previewData: {
    name: 'Мария Иванова',
    email: 'maria@example.com',
    phone: '+7 999 123-45-67',
    ticketType: 'Участник аукциона',
    message: 'Хочу на тренировку «Либидо фитнес» 18.04',
    promoCode: 'MIRROR2025',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }
const container = { maxWidth: '520px', margin: '0 auto', backgroundColor: '#ffffff' }
const headerBar = {
  backgroundColor: DARK_BG,
  padding: '28px 32px 24px',
  textAlign: 'center' as const,
}
const headerTitle = {
  fontSize: '16px',
  fontWeight: '700' as const,
  color: CREAM,
  letterSpacing: '0.15em',
  margin: '0 0 4px',
  fontFamily: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
}
const headerSubtitle = {
  fontSize: '11px',
  color: 'rgba(245,245,240,0.5)',
  letterSpacing: '0.1em',
  margin: '0',
  textTransform: 'uppercase' as const,
}
const content = { padding: '32px 32px 24px' }
const h1 = {
  fontSize: '20px',
  fontWeight: '600' as const,
  color: DARK_BG,
  margin: '0 0 8px',
}
const intro = { fontSize: '14px', color: '#666', margin: '0 0 24px', lineHeight: '1.5' }
const dataCard = {
  backgroundColor: '#FAFAF8',
  border: '1px solid #E8E8E4',
  padding: '20px 24px',
  borderRadius: '4px',
}
const label = {
  fontSize: '10px',
  color: '#999',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.15em',
  margin: '0 0 2px',
  lineHeight: '1.2',
}
const value = { fontSize: '15px', color: DARK_BG, margin: '0', lineHeight: '1.4' }
const divider = { borderColor: '#E8E8E4', margin: '12px 0' }
const footer = {
  backgroundColor: DARK_BG,
  padding: '16px 32px',
  textAlign: 'center' as const,
}
const footerText = { fontSize: '11px', color: 'rgba(245,245,240,0.4)', margin: '0' }
