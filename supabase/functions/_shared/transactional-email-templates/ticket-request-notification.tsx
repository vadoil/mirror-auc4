import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Отражение добра"

interface TicketRequestNotificationProps {
  name?: string
  email?: string
  phone?: string
  ticketType?: string
  message?: string
}

const TicketRequestNotificationEmail = ({ name, email, phone, ticketType, message }: TicketRequestNotificationProps) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Новая заявка на участие — {name || 'Без имени'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Новая заявка на аукцион</Heading>
        <Hr style={hr} />
        <Section style={section}>
          <Text style={label}>Имя</Text>
          <Text style={value}>{name || '—'}</Text>
          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>
          <Text style={label}>Телефон</Text>
          <Text style={value}>{phone || '—'}</Text>
          <Text style={label}>Тип билета</Text>
          <Text style={value}>{ticketType || '—'}</Text>
          {message && (
            <>
              <Text style={label}>Комментарий</Text>
              <Text style={value}>{message}</Text>
            </>
          )}
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          {SITE_NAME} · Благотворительный аукцион
        </Text>
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
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '32px 24px', maxWidth: '520px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1a1a1a', margin: '0 0 16px' }
const hr = { borderColor: '#e5e5e5', margin: '20px 0' }
const section = { margin: '0' }
const label = { fontSize: '11px', color: '#999', textTransform: 'uppercase' as const, letterSpacing: '0.05em', margin: '12px 0 2px', lineHeight: '1.2' }
const value = { fontSize: '15px', color: '#1a1a1a', margin: '0 0 8px', lineHeight: '1.4' }
const footer = { fontSize: '12px', color: '#999', margin: '16px 0 0' }
