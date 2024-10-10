describe('Reservations', () => {
  let jwt: string;

  beforeEach(async () => {
    const userData = {
      email: 'itpracownia@outlook.com',
      password: 'SomePassword123!',
    };
    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    jwt = await response.text();
  });
  test('create', () => {
    expect(true).toBeTruthy();
  });
});
