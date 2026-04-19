import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  ticketType?: string
  amount?: number
  yookassaPaymentId?: string
}

const TicketPaidNotificationEmail = ({ name, email, ticketType, amount, yookassaPaymentId }: Props) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Новая оплата на «Отражение добра»</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>💳 Новая оплата получена</Heading>
        <Section style={card}>
          <Text style={cardLabel}>Имя</Text>
          <Text style={cardValue}>{name ?? '—'}</Text>
          <Text style={cardLabel}>Email</Text>
          <Text style={cardValue}>{email ?? '—'}</Text>
          <Text style={cardLabel}>Тариф</Text>
          <Text style={cardValue}>{ticketType ?? '—'}</Text>
          {typeof amount === 'number' && (
            <>
              <Text style={cardLabel}>Сумма</Text>
              <Text style={cardValue}>{amount.toLocaleString('ru-RU')} ₽</Text>
            </>
          )}
          {yookassaPaymentId && (
            <>
              <Text style={cardLabel}>ID платежа ЮKassa</Text>
              <Text style={cardValueSmall}>{yookassaPaymentId}</Text>
            </>
          )}
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: TicketPaidNotificationEmail,
  subject: 'Оплата получена — «Отражение добра»',
  displayName: 'Уведомление организаторам об оплате',
  previewData: { name: 'Анна', email: 'anna@example.com', ticketType: 'Стандарт', amount: 15000, yookassaPaymentId: '2f0...' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 18px' }
const card = { backgroundColor: '#f5f5f5', padding: '18px 20px', borderRadius: '6px' }
const cardLabel = { fontSize: '11px', color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.08em', margin: '0 0 4px' }
const cardValue = { fontSize: '15px', color: '#1a1a1a', fontWeight: 600, margin: '0 0 12px' }
const cardValueSmall = { fontSize: '12px', color: '#444', fontFamily: 'monospace', margin: '0 0 12px', wordBreak: 'break-all' as const }
