import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,

} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Отражение добра'
const PRIMARY_COLOR = '#E02020'
const DARK_BG = '#1E1E1E'
const CREAM = '#F5F5F0'

interface Props {
  name?: string
  ticketType?: string
  amount?: number
}

const TicketPaidConfirmationEmail = ({ name, ticketType, amount }: Props) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Спасибо за ваше пожертвование - «Отражение добра»</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerBar}>
          <Text style={headerTitle}>ОТРАЖЕНИЕ ДОБРА</Text>
          <Text style={headerSubtitle}>Благотворительный вечер · 13 августа 2026 · Санкт-Петербург</Text>
        </Section>

        <Section style={content}>
          <Heading style={h1}>
            {name ? `${name}, благодарим вас за пожертвование!` : 'Дорогие друзья, благодарим вас за пожертвование!'}
          </Heading>

          <Text style={text}>
            Благодарим вас за поддержку нашего события! Все собранные средства будут направлены на работу фонда «Не напрасно», который поддерживает людей с онкологическими заболеваниями по всей стране.
          </Text>

          <Section style={dataCard}>
            {typeof amount === 'number' && amount > 0 && (
              <>
                <Text style={label}>СУММА ПОЖЕРТВОВАНИЯ</Text>
                <Text style={amountValue}>{amount.toLocaleString('ru-RU')}&nbsp;₽</Text>
                <Hr style={divider} />
              </>
            )}
            <Text style={label}>НАЗНАЧЕНИЕ</Text>
            <Text style={value}>{ticketType ?? 'Благотворительное пожертвование'}</Text>
          </Section>

          <Section style={detailsBlock}>
            <Text style={detailLabel}>КОГДА</Text>
            <Text style={detailValue}>13 августа 2026, сбор гостей в 17:30</Text>
            <Text style={detailLabel}>ГДЕ</Text>
            <Text style={detailValue}>Санкт-Петербург, центр «Зрение», пр. Добролюбова, 20к1</Text>
          </Section>

          <Text style={text}>
            Накануне события мы ещё раз свяжемся с вами для напоминания и уточнения деталей.
          </Text>

          <Text style={text}>
            До встречи!
          </Text>

          <Text style={signOff}>
            С теплом, команда «{SITE_NAME}»
          </Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            Собранные средства направляются в фонд «Не напрасно» на помощь людям
            с онкологическими заболеваниями
          </Text>
          <Text style={{ ...footerText, marginTop: '8px' }}>
            С теплом, команда «{SITE_NAME}»
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: TicketPaidConfirmationEmail,
  subject: 'Спасибо за пожертвование - «Отражение добра»',
  displayName: 'Благодарность за пожертвование (клиенту)',
  previewData: { name: 'Анна', ticketType: 'Благотворительное пожертвование', amount: 7000 },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }
const container = { maxWidth: '520px', margin: '0 auto', backgroundColor: '#ffffff' }
const headerBar = { backgroundColor: DARK_BG, padding: '28px 32px 24px', textAlign: 'center' as const }
const headerTitle = {
  fontSize: '16px', fontWeight: '700' as const, color: CREAM, letterSpacing: '0.15em',
  margin: '0 0 4px', fontFamily: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
}
const headerSubtitle = {
  fontSize: '11px', color: 'rgba(245,245,240,0.5)', letterSpacing: '0.08em', margin: '0',
  textTransform: 'uppercase' as const,
}
const content = { padding: '32px 32px 24px' }
const h1 = { fontSize: '22px', fontWeight: '600' as const, color: DARK_BG, margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#444', margin: '0 0 18px', lineHeight: '1.7' }
const dataCard = {
  backgroundColor: '#FAFAF8', border: '1px solid #E8E8E4', padding: '20px 24px',
  borderRadius: '4px', margin: '0 0 20px',
}
const label = {
  fontSize: '10px', color: '#999', textTransform: 'uppercase' as const,
  letterSpacing: '0.15em', margin: '0 0 4px', lineHeight: '1.2',
}
const value = { fontSize: '15px', color: DARK_BG, margin: '0', lineHeight: '1.4' }
const amountValue = {
  fontSize: '26px', color: PRIMARY_COLOR, fontWeight: '700' as const, margin: '0',
  whiteSpace: 'nowrap' as const,
}
const divider = { borderColor: '#E8E8E4', margin: '14px 0' }
const detailsBlock = { borderLeft: `3px solid ${PRIMARY_COLOR}`, paddingLeft: '16px', margin: '0 0 24px' }
const detailLabel = {
  fontSize: '10px', color: '#999', textTransform: 'uppercase' as const,
  letterSpacing: '0.12em', margin: '8px 0 2px', lineHeight: '1.2',
}
const detailValue = { fontSize: '14px', color: DARK_BG, margin: '0 0 4px', lineHeight: '1.5' }
const signOff = { fontSize: '14px', color: '#555', margin: '24px 0 0', lineHeight: '1.7', fontStyle: 'italic' as const }
const footer = { backgroundColor: '#FAFAF8', padding: '20px 32px', textAlign: 'center' as const }
const footerText = { fontSize: '11px', color: '#888', margin: '0', lineHeight: '1.6' }

