// Какой платёжной системой сейчас принимаем оплату: ЮKassa, если заданы её ключи, иначе CloudPayments.
import { yookassaEnabled } from '../_shared/yookassa.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve((req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  return new Response(JSON.stringify({ provider: yookassaEnabled() ? 'yookassa' : 'cloudpayments' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
