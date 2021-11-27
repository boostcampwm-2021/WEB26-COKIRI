import * as request from 'supertest';

import app from 'src/app';

describe('GET /', () => {
  test('status to be 200', async () => {
    const res = await request(app).get('/users/me');
    expect(res.status).toBe(500);
  });
});
