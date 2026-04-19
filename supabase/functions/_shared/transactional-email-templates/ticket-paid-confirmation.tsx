import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Отражение добра'

interface Props {
  name?: string
  ticketType?: string
  amount?: number
}

const TicketPaidConfirmationEmail = ({ name, ticketType, amount }: Props) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Оплата получена — добро пожаловать на «Отражение добра»</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `${name}, оплата получена!` : 'Оплата получена!'}
        </Heading>
        <Text style={text}>
          Спасибо за участие в благотворительном аукционе «Отражение добра» 26 апреля 2026 года в Москве.
        </Text>
        <Section style={card}>
          <Text style={cardLabel}>Тариф</Text>
          <Text style={cardValue}>{ticketType ?? '—'}</Text>
          {typeof amount === 'number' && amount > 0 && (
            <>
              <Text style={cardLabel}>Сумма оплаты</Text>
              <Text style={cardValue}>{amount.toLocaleString('ru-RU')} ₽</Text>
            </>
          )}
        </Section>
        <Text style={text}>
          Ваше место забронировано. Подробности о программе, дресс-коде и логистике мы пришлём дополнительно ближе к мероприятию.
        </Text>
        <Text style={text}>
          Если у вас есть вопросы — напишите нам в ответ на это письмо.
        </Text>
        <Text style={footer}>С теплом, команда «{SITE_NAME}»</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: TicketPaidConfirmationEmail,
  subject: 'Оплата получена — «Отражение добра»',
  displayName: 'Подтверждение оплаты билета',
  previewData: { name: 'Анна', ticketType: 'Стандарт', amount: 15000 },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 18px' }
const text = { fontSize: '14px', color: '#444', lineHeight: '1.6', margin: '0 0 16px' }
const card = { backgroundColor: '#faf7f2', padding: '18px 20px', borderRadius: '6px', margin: '8px 0 20px' }
const cardLabel = { fontSize: '11px', color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.08em', margin: '0 0 4px' }
const cardValue = { fontSize: '15px', color: '#1a1a1a', fontWeight: 600, margin: '0 0 12px' }
const footer = { fontSize: '12px', color: '#999', margin: '28px 0 0' }
