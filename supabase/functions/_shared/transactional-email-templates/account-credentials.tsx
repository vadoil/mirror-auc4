import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Отражение добра'
const LOGIN_URL = 'https://xn--80aodvkjc9f.xn--p1ai/auth'

interface Props {
  name?: string
  email?: string
  password?: string
}

const AccountCredentialsEmail = ({ name, email, password }: Props) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Ваш доступ в личный кабинет «Отражение добра»</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `${name}, ваш доступ готов` : 'Ваш доступ готов'}
        </Heading>
        <Text style={text}>
          Мы создали для вас личный кабинет участника аукциона «{SITE_NAME}».
          В нём вы сможете заранее посмотреть лоты и проявить интерес к тем,
          за которые планируете торговаться.
        </Text>

        <Section style={card}>
          <Text style={cardLabel}>Логин (email)</Text>
          <Text style={cardValue}>{email ?? '—'}</Text>
          <Text style={cardLabel}>Пароль</Text>
          <Text style={cardValueMono}>{password ?? '—'}</Text>
        </Section>

        <Section style={{ textAlign: 'center', margin: '24px 0' }}>
          <Button href={LOGIN_URL} style={button}>Войти в личный кабинет</Button>
        </Section>

        <Text style={text}>
          Рекомендуем сменить пароль после первого входа — на странице входа есть ссылка «Забыли пароль?».
        </Text>
        <Text style={text}>
          Платить за ставки заранее не нужно — все торги пройдут вживую на мероприятии 26 апреля.
        </Text>
        <Text style={footer}>С теплом, команда «{SITE_NAME}»</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AccountCredentialsEmail,
  subject: 'Ваш доступ в личный кабинет «Отражение добра»',
  displayName: 'Доступ в личный кабинет',
  previewData: { name: 'Анна', email: 'anna@example.com', password: '482917' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 18px' }
const text = { fontSize: '14px', color: '#444', lineHeight: '1.6', margin: '0 0 16px' }
const card = { backgroundColor: '#faf7f2', padding: '18px 20px', borderRadius: '6px', margin: '8px 0 20px' }
const cardLabel = { fontSize: '11px', color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.08em', margin: '0 0 4px' }
const cardValue = { fontSize: '15px', color: '#1a1a1a', fontWeight: 600, margin: '0 0 12px' }
const cardValueMono = { fontSize: '20px', color: '#1a1a1a', fontWeight: 700, margin: '0 0 4px', letterSpacing: '0.15em', fontFamily: 'monospace' }
const button = { backgroundColor: '#1a1a1a', color: '#ffffff', padding: '12px 28px', borderRadius: '4px', fontSize: '14px', textDecoration: 'none', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }
const footer = { fontSize: '12px', color: '#999', margin: '28px 0 0' }
