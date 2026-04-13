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

// Context-aware content based on form type
function getContent(ticketType?: string) {
  const t = ticketType || ''

  if (t.includes('Тренировка')) {
    return {
      preview: 'Вы записаны на тренировку — Отражение добра',
      heading: (name?: string) => name ? `${name}, вы записаны!` : 'Вы записаны!',
      body: 'Мы получили вашу запись на тренировку-презентацию «Либидо фитнес». Это бесплатное мероприятие для участниц клуба «Отражение».',
      showEvent: true,
      eventDate: '18 апреля 2026, пятница',
      eventPlace: 'Баланс-холл «Место быть», Мясницкая 24/7с1',
      subject: 'Запись на тренировку — Отражение добра',
    }
  }

  if (t === 'Задать вопрос') {
    return {
      preview: 'Мы получили ваш вопрос — Отражение добра',
      heading: (name?: string) => name ? `${name}, спасибо за обращение!` : 'Спасибо за обращение!',
      body: 'Мы получили ваш вопрос и ответим в ближайшее время.',
      showEvent: false,
      subject: 'Ваш вопрос получен — Отражение добра',
    }
  }

  if (t === 'Узнать о форуме') {
    return {
      preview: 'Информация о форуме «Отражение» — осень 2026',
      heading: (name?: string) => name ? `${name}, спасибо за интерес!` : 'Спасибо за интерес!',
      body: 'Мы получили вашу заявку на получение информации о форуме «Отражение». Мы свяжемся с вами, когда откроется регистрация.',
      showEvent: true,
      eventDate: 'Осень 2026',
      eventPlace: 'Москва',
      subject: 'Форум «Отражение» — мы вас запомнили',
    }
  }

  if (t === 'Участие в форуме') {
    return {
      preview: 'Заявка на форум «Отражение» принята',
      heading: (name?: string) => name ? `${name}, заявка принята!` : 'Заявка принята!',
      body: 'Мы получили вашу заявку на участие в форуме «Отражение». Организатор свяжется с вами для уточнения деталей.',
      showEvent: true,
      eventDate: 'Осень 2026',
      eventPlace: 'Москва',
      subject: 'Заявка на форум «Отражение» принята',
    }
  }

  if (t.includes('Питер') || t.includes('СПб')) {
    return {
      preview: 'Детали мероприятия в Санкт-Петербурге — Отражение добра',
      heading: (name?: string) => name ? `${name}, спасибо за интерес!` : 'Спасибо за интерес!',
      body: 'Мы получили вашу заявку на получение деталей мероприятия в Санкт-Петербурге. Свяжемся с вами, когда будет доступна программа.',
      showEvent: false,
      subject: 'Мероприятие в Санкт-Петербурге — Отражение добра',
    }
  }

  // Default: auction ticket registration
  return {
    preview: 'Ваша заявка на аукцион принята — Отражение добра',
    heading: (name?: string) => name ? `${name}, спасибо за заявку!` : 'Спасибо за заявку!',
    body: 'Мы получили вашу заявку на участие в благотворительном аукционе «Отражение добра». Наш организатор свяжется с вами для подтверждения участия.',
    showEvent: true,
    eventDate: '26 апреля 2026, суббота',
    eventPlace: 'Баланс-холл «Место быть», Мясницкая 24/7с1',
    subject: 'Заявка на аукцион принята — Отражение добра',
  }
}

const TicketRequestConfirmationEmail = ({ name, ticketType, promoCode }: TicketRequestConfirmationProps) => {
  const ctx = getContent(ticketType)

  return (
    <Html lang="ru" dir="ltr">
      <Head />
      <Preview>{ctx.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerBar}>
            <Text style={headerTitle}>ОТРАЖЕНИЕ ДОБРА</Text>
            <Text style={headerSubtitle}>Благотворительный аукцион · 26 апреля 2026</Text>
          </Section>

          <Section style={content}>
            <Heading style={h1}>{ctx.heading(name)}</Heading>

            <Text style={text}>{ctx.body}</Text>

            <Section style={dataCard}>
              <Text style={label}>ТИП ЗАЯВКИ</Text>
              <Text style={value}>{ticketType || 'Участник аукциона'}</Text>

              {promoCode && (
                <>
                  <Hr style={divider} />
                  <Text style={label}>ПРОМОКОД</Text>
                  <Text style={{ ...value, color: '#16a34a' }}>✓ {promoCode} — регистрация без оплаты</Text>
                </>
              )}
            </Section>

            {ctx.showEvent && (
              <Section style={detailsBlock}>
                <Text style={detailLabel}>КОГДА</Text>
                <Text style={detailValue}>{ctx.eventDate}</Text>
                <Text style={detailLabel}>ГДЕ</Text>
                <Text style={detailValue}>{ctx.eventPlace}</Text>
              </Section>
            )}

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
}

export const template = {
  component: TicketRequestConfirmationEmail,
  subject: (data: Record<string, any>) => {
    const ctx = getContent(data.ticketType)
    return ctx.subject
  },
  displayName: 'Подтверждение заявки (клиенту)',
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
