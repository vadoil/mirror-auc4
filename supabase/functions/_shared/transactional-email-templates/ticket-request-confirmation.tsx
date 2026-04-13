import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Section, Button,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Отражение добра"
const PRIMARY_COLOR = "#E02020"
const DARK_BG = "#1E1E1E"
const CREAM = "#F5F5F0"

interface TicketRequestConfirmationProps {
  name?: string
  ticketType?: string
  promoCode?: string
}

const TicketRequestConfirmationEmail = ({ name, ticketType, promoCode }: TicketRequestConfirmationProps) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Ваша заявка принята — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={headerBar}>
          <Text style={headerTitle}>ОТРАЖЕНИЕ ДОБРА</Text>
          <Text style={headerSubtitle}>Благотворительный аукцион · 26 апреля 2025</Text>
        </Section>

        <Section style={content}>
          <Heading style={h1}>
            {name ? `${name}, спасибо за заявку!` : 'Спасибо за заявку!'}
          </Heading>

          <Text style={text}>
            Мы получили вашу заявку на участие в благотворительном аукционе «Отражение добра».
          </Text>

          <Section style={dataCard}>
            <Text style={label}>ТИП УЧАСТИЯ</Text>
            <Text style={value}>{ticketType || 'Участник аукциона'}</Text>

            {promoCode && (
              <>
                <Hr style={divider} />
                <Text style={label}>ПРОМОКОД</Text>
                <Text style={{ ...value, color: '#16a34a' }}>✓ {promoCode} — регистрация без оплаты</Text>
              </>
            )}
          </Section>

          <Text style={text}>
            Наш организатор свяжется с вами в ближайшее время для подтверждения участия и уточнения деталей.
          </Text>

          <Section style={detailsBlock}>
            <Text style={detailLabel}>КОГДА</Text>
            <Text style={detailValue}>26 апреля 2025, суббота</Text>
            <Text style={detailLabel}>ГДЕ</Text>
            <Text style={detailValue}>Баланс-холл «Место быть», Мясницкая 24/7с1</Text>
          </Section>

          <Section style={{ textAlign: 'center' as const, margin: '24px 0 8px' }}>
            <Button style={ctaButton} href="https://mirror-auc4.lovable.app">
              Подробнее о мероприятии
            </Button>
          </Section>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            Все деньги, вырученные с продаж билетов и аукциона, направляются в поддержку фонда «Не напрасно»
          </Text>
          <Text style={{ ...footerText, marginTop: '8px' }}>
            {SITE_NAME} · Благотворительный аукцион
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: TicketRequestConfirmationEmail,
  subject: 'Ваша заявка принята — Отражение добра',
  displayName: 'Подтверждение заявки на билет (клиенту)',
  previewData: {
    name: 'Мария',
    ticketType: 'Участник аукциона',
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
  fontSize: '22px',
  fontWeight: '600' as const,
  color: DARK_BG,
  margin: '0 0 16px',
}
const text = { fontSize: '14px', color: '#444', margin: '0 0 20px', lineHeight: '1.6' }
const dataCard = {
  backgroundColor: '#FAFAF8',
  border: '1px solid #E8E8E4',
  padding: '20px 24px',
  borderRadius: '4px',
  margin: '0 0 20px',
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
const detailsBlock = {
  borderLeft: `3px solid ${PRIMARY_COLOR}`,
  paddingLeft: '16px',
  margin: '0 0 24px',
}
const detailLabel = {
  fontSize: '10px',
  color: '#999',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.12em',
  margin: '8px 0 2px',
  lineHeight: '1.2',
}
const detailValue = { fontSize: '14px', color: DARK_BG, margin: '0 0 4px', lineHeight: '1.4' }
const ctaButton = {
  backgroundColor: PRIMARY_COLOR,
  color: '#ffffff',
  padding: '14px 32px',
  fontSize: '12px',
  fontWeight: '600' as const,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  textDecoration: 'none',
  display: 'inline-block',
  borderRadius: '2px',
}
const footer = {
  backgroundColor: DARK_BG,
  padding: '20px 32px',
  textAlign: 'center' as const,
}
const footerText = { fontSize: '11px', color: 'rgba(245,245,240,0.4)', margin: '0', lineHeight: '1.5' }
