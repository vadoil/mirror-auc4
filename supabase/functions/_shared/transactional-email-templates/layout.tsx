import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Html, Preview, Section, Text, Button, Link,
} from 'npm:@react-email/components@0.0.22'

export const SITE_URL = 'https://xn--80aodvkjc9f.xn--p1ai'
export const SITE_NAME = 'Отражение добра'
export const RED = '#E02020'
const INK = '#262626'
const MUTED = '#6B6864'
const CREAM = '#F4F2EC'
const LINE = '#ECE9E1'

export const EmailLayout = ({ preview, children }: { preview: string; children: React.ReactNode }) => (
  <Html lang="ru" dir="ltr">
    <Head>
      <meta charSet="utf-8" />
    </Head>
    <Preview>{preview}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={wordmark}>
            ОТРАЖЕНИЕ <span style={{ color: RED, fontStyle: 'italic' }}>ДОБРА</span>
          </Text>
          <Text style={kicker}>Благотворительный аукцион</Text>
        </Section>

        <Section style={content}>{children}</Section>

        <Section style={footer}>
          <Text style={footerText}>
            Средства направляются в фонд «Не напрасно» на помощь людям с онкологическими заболеваниями.
          </Text>
          <Text style={footerText}>
            Вопросы? Просто ответьте на это письмо.{' '}
            <Link href={SITE_URL} style={{ color: MUTED, textDecoration: 'underline' }}>отразись.рф</Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const Cta = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Section style={{ margin: '28px 0 8px' }}>
    <Button style={button} href={href}>{children}</Button>
  </Section>
)

export const InfoCard = ({ rows }: { rows: { label: string; value: React.ReactNode }[] }) => (
  <Section style={card}>
    {rows.map((r, i) => (
      <div key={i} style={{ marginTop: i === 0 ? 0 : 14 }}>
        <Text style={label}>{r.label}</Text>
        <Text style={value}>{r.value}</Text>
      </div>
    ))}
  </Section>
)

const serif = "Georgia, 'Times New Roman', serif"
const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif"

const main = { backgroundColor: CREAM, fontFamily: sans, padding: '32px 12px' }
const container = { maxWidth: '560px', margin: '0 auto', backgroundColor: '#ffffff', border: `1px solid ${LINE}` }
const header = { padding: '28px 36px 20px', borderBottom: `1px solid ${LINE}` }
const wordmark = { fontFamily: serif, fontSize: '22px', letterSpacing: '0.12em', color: INK, margin: '0 0 6px', lineHeight: '1.2' }
const kicker = { fontFamily: sans, fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: MUTED, margin: 0 }
const content = { padding: '32px 36px 28px' }
export const h1 = { fontFamily: serif, fontSize: '26px', fontWeight: '400' as const, color: INK, lineHeight: '1.25', margin: '0 0 18px' }
export const p = { fontFamily: sans, fontSize: '15px', color: '#4A4A4A', lineHeight: '1.65', margin: '0 0 16px' }
export const signOff = { ...p, color: INK, margin: '24px 0 0' }
const card = { backgroundColor: '#FAF8F3', borderLeft: `3px solid ${RED}`, padding: '16px 20px', margin: '8px 0 20px' }
const label = { fontFamily: sans, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: MUTED, margin: '0 0 3px', lineHeight: '1.2' }
const value = { fontFamily: sans, fontSize: '15px', color: INK, margin: 0, lineHeight: '1.45' }
const button = {
  backgroundColor: RED, color: '#ffffff', padding: '14px 28px', fontFamily: sans, fontSize: '12px',
  fontWeight: '600' as const, letterSpacing: '0.15em', textTransform: 'uppercase' as const,
  textDecoration: 'none', display: 'inline-block', borderRadius: '3px',
}
const footer = { backgroundColor: CREAM, padding: '20px 36px', borderTop: `1px solid ${LINE}` }
const footerText = { fontFamily: sans, fontSize: '12px', color: MUTED, lineHeight: '1.6', margin: '0 0 6px' }
