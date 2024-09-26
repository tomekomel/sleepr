import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    { apiVersion: '2024-06-20' },
  );

  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
