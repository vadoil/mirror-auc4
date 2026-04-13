/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as ticketRequestNotification } from './ticket-request-notification.tsx'
import { template as ticketRequestConfirmation } from './ticket-request-confirmation.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'ticket-request-notification': ticketRequestNotification,
  'ticket-request-confirmation': ticketRequestConfirmation,
}
