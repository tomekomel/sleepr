import { beforeEach } from 'node:test';

describe('Reservations', () => {
  beforeEach(async () => {
    await fetch('http://auth:3001', {
      method: 'POST',
      body: JSON.stringify({
        email: 'itpracownia@outlook.com',
        password: 'SomePassword123!',
      }),
    });
  });
  test('create', () => {});
});
