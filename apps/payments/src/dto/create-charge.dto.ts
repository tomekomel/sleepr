import Stripe from 'stripe';

export interface CreateChargeDto {
  card: Stripe.PaymentMethodCreateParams.Card;
  amount: number;
}
