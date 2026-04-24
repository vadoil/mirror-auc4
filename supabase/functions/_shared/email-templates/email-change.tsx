/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface EmailChangeEmailProps {
  siteName: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({ siteName, email, newEmail, confirmationUrl }: EmailChangeEmailProps) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Подтвердите смену email для «{siteName}»</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Подтвердите смену email</Heading>
        <Text style={text}>
          Вы запросили смену email для аккаунта на «{siteName}»:{' '}
          <Link href={`mailto:${email}`} style={link}>{email}</Link>{' '}→{' '}
          <Link href={`mailto:${newEmail}`} style={link}>{newEmail}</Link>.
        </Text>
        <Text style={text}>Нажмите на кнопку ниже, чтобы подтвердить изменение:</Text>
        <Button style={button} href={confirmationUrl}>Подтвердить смену email</Button>
        <Text style={footer}>
          Если вы не запрашивали смену — немедленно защитите ваш аккаунт.
        </Text>
        <Text style={footer}>С теплом, команда «{siteName}»</Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '20px 25px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#000000', margin: '0 0 20px' }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.5', margin: '0 0 25px' }
const link = { color: 'inherit', textDecoration: 'underline' }
const button = { backgroundColor: '#b91c1c', color: '#ffffff', fontSize: '14px', borderRadius: '8px', padding: '12px 20px', textDecoration: 'none' }
const footer = { fontSize: '12px', color: '#999999', margin: '20px 0 0' }
