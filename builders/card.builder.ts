import { CardDetails } from '../types/cardDetails'

export function buildCardDetails(
  name: string,
  overrides: Partial<CardDetails> = {}
): CardDetails {
  return {
    name,
    cardNumber: '4111111111111111',
    cvc: '123',
    expirationMonth: '12',
    expirationYear: '2030',
    ...overrides
  }
}