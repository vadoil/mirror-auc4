import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const PRIMARY_COLOR = '#E02020'
const DARK_BG = '#1E1E1E'
const CREAM = '#F5F5F0'

interface Props {
  name?: string
  email?: string
  phone?: string
  ticketType?: string
  amount?: number
  yookassaPaymentId?: string
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <>
    <Text style={cardLabel}>{label}</Text>
    <Text style={cardValue}>{value}</Text>
  </>
)

const TicketPaidNotificationEmail = ({ name, email, phone, ticketType, amount, yookassaPaymentId }: Props) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Новое пожертвование - «Отражение добра»</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerBar}>
          <Text style={headerTitle}>ОТРАЖЕНИЕ ДОБРА</Text>
          <Text style={headerSubtitle}>Уведомление организаторам</Text>
        </Section>

        <Section style={content}>
          <Heading style={h1}>Получено новое пожертвование</Heading>

          {typeof amount === 'number' && amount > 0 && (
            <Text style={amountValue}>{amount.toLocaleString('ru-RU')}&nbsp;₽</Text>
          )}

          <Section style={card}>
            <Row label="ИМЯ" value={name ?? '-'} />
            <Row label="EMAIL" value={email ?? '-'} />
            {phone && <Row label="ТЕЛЕФОН" value={phone} />}
            <Row label="НАЗНАЧЕНИЕ" value={ticketType ?? '-'} />
            {yookassaPaymentId && (
              <>
                <Text style={cardLabel}>ID ПЛАТЕЖА</Text>
                <Text style={cardValueSmall}>{yookassaPaymentId}</Text>
              </>
            )}
          </Section>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: TicketPaidNotificationEmail,
  subject: 'Новое пожертвование - «Отражение добра»',
  displayName: 'Уведомление организаторам о пожертвовании',
  previewData: {
    name: 'Анна', email: 'anna@example.com', phone: '+7 900 000-00-00',
    ticketType: 'Благотворительное пожертвование', amount: 7000, yookassaPaymentId: '3685275183',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }
const container = { maxWidth: '520px', margin: '0 auto', backgroundColor: '#ffffff' }
const headerBar = { backgroundColor: DARK_BG, padding: '24px 32px 20px', textAlign: 'center' as const }
const headerTitle = {
  fontSize: '15px', fontWeight: '700' as const, color: CREAM, letterSpacing: '0.15em',
  margin: '0 0 4px', fontFamily: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
}
const headerSubtitle = {
  fontSize: '11px', color: 'rgba(245,245,240,0.5)', letterSpacing: '0.1em', margin: '0',
  textTransform: 'uppercase' as const,
}
const content = { padding: '28px 32px 24px' }
const h1 = { fontSize: '19px', fontWeight: '600' as const, color: DARK_BG, margin: '0 0 12px' }
const amountValue = {
  fontSize: '28px', color: PRIMARY_COLOR, fontWeight: '700' as const, margin: '0 0 18px',
  whiteSpace: 'nowrap' as const,
}
const card = {
  backgroundColor: '#FAFAF8', border: '1px solid #E8E8E4', padding: '20px 24px', borderRadius: '4px',
}
const cardLabel = {
  fontSize: '10px', color: '#999', textTransform: 'uppercase' as const,
  letterSpacing: '0.15em', margin: '0 0 3px', lineHeight: '1.2',
}
const cardValue = { fontSize: '15px', color: DARK_BG, fontWeight: 600, margin: '0 0 14px', lineHeight: '1.4' }
const cardValueSmall = {
  fontSize: '12px', color: '#555', fontFamily: 'monospace', margin: '0',
  wordBreak: 'break-all' as const,
}
