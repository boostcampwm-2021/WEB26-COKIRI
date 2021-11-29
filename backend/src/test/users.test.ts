import * as request from 'supertest';

import app from 'src/app';
import { connect, disconnect, dropDatabase } from 'src/test/mongoDBMemoryServer';
import { Authorization, ObjectID, RESPONSECODE } from 'src/utils';
import { User } from 'src/models';
import { UserType } from 'src/types';

beforeAll(async () => {
  await connect();
});
afterAll(async () => {
  await disconnect();
});

let token: string;
let user: UserType = {
  name: process.env.TEST_USER,
  username: process.env.TEST_USER,
  _id: ObjectID.stringToObjectID(process.env.TEST_USER_ID!),
  authProvider: 'google',
  authProviderID: process.env.TEST_USER,
};

describe('회원가입', () => {
  beforeAll(async () => {
    token = Authorization.createTestJWT();
    await User.create(user);
  });

  afterAll(async () => {
    await dropDatabase();
  });

  test('자신의 정보 요청', async () => {
    const response = await request(app).get('/v1/users/me').set('Authorization', `Bearer ${token}`);
    user = response.body.data;
    expect(user.isRegistered).toBe(false);
    expect(response.body.code).toBe(RESPONSECODE.SUCCESS);
    expect(response.status).toBe(200);
  });

  test('유저네임 유효성 검사', async () => {
    const responseTrue = await request(app).get('/v1/users?query=test');
    expect(responseTrue.body.data).toBe(true);
    expect(responseTrue.status).toBe(200);

    const responseFalse = await request(app).get('/v1/users?query=testuser');
    expect(responseFalse.body.data).toBe(false);
    expect(responseFalse.status).toBe(200);
  });

  test('사용자 입력 데이터 저장(회원가입)', async () => {
    const response = await request(app)
      .put(`/v1/users/${user._id}/settings`)
      .send({ name: 'testUser', username: 'test1' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
  });
});

describe('타입라인 테스트', () => {
  test('타임라인 불러오기', async () => {
    const response = await request(app).get('/v1/users/me').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
