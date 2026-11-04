import { describe, expect, it } from 'vitest';
import { verifiedPaymentEvent } from '../../supabase/functions/_shared/yookassa-event';
import { getTrainingPlaces, trainingStatusLabel } from '../../supabase/functions/_shared/wellness-training';

describe('verified payment status', () => {
  const payment = { id: 'test', status: 'succeeded' as const, paid: true, amount: { value: '440.00', currency: 'RUB' } };
  it('fulfills only an API-verified successful RUB payment', () => {
    expect(verifiedPaymentEvent(payment)).toBe('payment.succeeded');
    expect(verifiedPaymentEvent({ ...payment, status: 'pending' })).toBeNull();
    expect(verifiedPaymentEvent({ ...payment, status: 'waiting_for_capture' })).toBeNull();
    expect(verifiedPaymentEvent({ ...payment, paid: false })).toBeNull();
    expect(verifiedPaymentEvent({ ...payment, amount: { value: '440', currency: 'USD' } })).toBeNull();
    expect(verifiedPaymentEvent({ ...payment, status: 'canceled' })).toBe('payment.canceled');
  });
});
describe('training queue', () => {
  it('does not promise a confirmed place when status is missing', () => {
    expect(trainingStatusLabel()).toBe('статус уточняется');
    expect(trainingStatusLabel({ training: 'abs', status: 'waitlisted', queue_position: 3 })).toBe('в очереди · №3');
    expect(trainingStatusLabel({ training: 'abs', status: 'confirmed', queue_position: null })).toBe('место подтверждено');
  });
  it('propagates database errors instead of reporting an empty queue', async () => {
    const db = { from: () => ({ select: () => ({ eq: async () => ({ data: null, error: { code: 'ERR' } }) }) }) };
    await expect(getTrainingPlaces(db as never, 'id')).rejects.toThrow('training places: ERR');
  });
});
