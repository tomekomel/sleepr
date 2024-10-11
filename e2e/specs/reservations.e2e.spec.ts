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
  test('create & get', async () => {
    const createdReservation = await createReservation();
    const responseGet = await fetch(
      `http://reservations:3000/reservations/${createdReservation._id}`,
      {
        headers: {
          Authentication: jwt,
        },
      },
    );
    const reservation = await responseGet.json();

    expect(createdReservation).toEqual(reservation);
  });

  const createReservation = async () => {
    const responseCreate = await fetch(
      'http://reservations:3000/reservations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: jwt,
        },
        body: JSON.stringify({
          startDate: '2024-12-12',
          endDate: '2024-12-13',
          charge: {
            card: {
              cvc: '567',
              exp_month: 12,
              exp_year: 34,
              number: '4242424242424242',
            },
            amount: 19,
          },
        }),
      },
    );

    expect(responseCreate.ok).toBeTruthy();

    return responseCreate.json();
  };
});
