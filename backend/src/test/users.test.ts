import * as request from 'supertest';

import app from 'src/app';
import { connect, disconnect, dropDatabase } from 'src/test/mongoDBMemoryServer';

beforeAll(async () => {
  await connect();
});
afterEach(async () => {
  await dropDatabase();
});
afterAll(async () => {
  await disconnect();
});

describe('GET /', () => {
  test('status to be 200', async () => {
    const res = await request(app).get('/v1/users/me');
    expect(res.status).toBe(401);
  });
});
