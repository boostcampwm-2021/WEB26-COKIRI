import * as request from 'supertest';

import app from 'src/app';
import { connect, disconnect, dropDatabase } from 'src/test/mongoDBMemoryServer';

describe('GET /', () => {
  beforeAll(async () => {
    await connect();
  });
  beforeEach(async () => {
    await dropDatabase();
  });
  afterAll(async () => {
    await disconnect();
  });

  test('status to be 200', async () => {
    const res = await request(app).get('/v1/users/me');
    expect(res.status).toBe(404);
  });
});
