/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({ siteName, confirmationUrl }: MagicLinkEmailProps) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Ссылка для входа — «{siteName}»</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Вход в личный кабинет</Heading>
        <Text style={text}>
          Нажмите на кнопку ниже, чтобы войти в личный кабинет «{siteName}». Ссылка действительна ограниченное время.
        </Text>
        <Button style={button} href={confirmationUrl}>Войти</Button>
        <Text style={footer}>
          Если вы не запрашивали ссылку для входа — просто проигнорируйте это письмо.
        </Text>
        <Text style={footer}>С теплом, команда «{siteName}»</Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '20px 25px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#000000', margin: '0 0 20px' }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.5', margin: '0 0 25px' }
const button = { backgroundColor: '#b91c1c', color: '#ffffff', fontSize: '14px', borderRadius: '8px', padding: '12px 20px', textDecoration: 'none' }
const footer = { fontSize: '12px', color: '#999999', margin: '20px 0 0' }
