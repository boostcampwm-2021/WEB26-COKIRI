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
const user: UserType = {
  name: process.env.TEST_USER,
  username: process.env.TEST_USER,
  _id: ObjectID.stringToObjectID(process.env.TEST_USER_ID!),
};
const mockUser: UserType = {
  _id: ObjectID.create(),
  name: 'mock_user',
  username: 'mock_user',
  authProvider: 'google',
  authProviderID: 'mock_user',
  isRegistered: true,
};
const authProvider = {
  authProvider: 'google',
  authProviderID: process.env.TEST_USER,
};
const defaultProfileImage = '/images/default_profile_image.jpg';

describe('회원가입', () => {
  beforeAll(async () => {
    token = Authorization.createTestJWT(ObjectID.objectIDToString(user._id!));
    await User.create({ ...user, ...authProvider });
  });

  afterAll(async () => {
    await dropDatabase();
  });

  test('자신의 정보 요청', async () => {
    const response = await request(app).get('/v1/users/me').set('Authorization', `Bearer ${token}`);
    expect(response.body).toEqual({
      code: RESPONSECODE.SUCCESS,
      data: {
        ...user,
        _id: ObjectID.objectIDToString(user._id!),
        profileImage: defaultProfileImage,
        isRegistered: false,
        follows: [],
        followers: [],
        hasExternalGithub: false,
        hasExternalBlog: false,
      },
    });
    expect(response.status).toBe(200);
  });

  test('유저네임 유효성 검사', async () => {
    const responseTrue = await request(app).get('/v1/users').query({ query: 'test' });
    expect(responseTrue.body.data).toBe(true);
    expect(responseTrue.status).toBe(200);

    const responseFalse = await request(app).get('/v1/users').query({ query: 'test_user' });
    expect(responseFalse.body.data).toBe(false);
    expect(responseFalse.status).toBe(200);
  });

  test('사용자 입력 데이터 저장(회원가입)', async () => {
    const response = await request(app)
      .put(`/v1/users/${user._id}/settings`)
      .send({ name: 'testUser', username: 'test1' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual({ code: RESPONSECODE.SUCCESS });
    expect(response.status).toBe(200);
  });
});

describe('사용자 프로필 기능', () => {
  beforeAll(async () => {
    token = Authorization.createTestJWT(ObjectID.objectIDToString(user._id!));
    await User.create([{ ...user, ...authProvider, isRegistered: true }, mockUser]);
  });

  afterAll(async () => {
    await dropDatabase();
  });

  test('팔로우 하기', async () => {
    const response = await request(app)
      .post(`/v1/users/${ObjectID.objectIDToString(mockUser._id!)}/follows`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userID: user._id });
    expect(response.body).toEqual({ code: RESPONSECODE.SUCCESS });
    expect(response.status).toBe(200);
  });

  test('팔로우 당하기', async () => {
    const mockToken = Authorization.createTestJWT(ObjectID.objectIDToString(mockUser._id!));
    const response = await request(app)
      .post(`/v1/users/${ObjectID.objectIDToString(user._id!)}/follows`)
      .set('Authorization', `Bearer ${mockToken}`)
      .send({ userID: mockUser._id });
    expect(response.body).toEqual({ code: RESPONSECODE.SUCCESS });
    expect(response.status).toBe(200);
  });

  test('프로필 기본정보', async () => {
    const response = await request(app).get('/v1/users').query({ username: user.username });
    expect(response.body).toEqual({
      code: RESPONSECODE.SUCCESS,
      data: {
        ...user,
        _id: ObjectID.objectIDToString(user._id!),
        profileImage: defaultProfileImage,
        isRegistered: true,
        postCount: 0,
        followCount: 1,
        followerCount: 1,
      },
    });
    expect(response.status).toBe(200);
  });

  test('팔로우, 팔로워 리스트 보기', async () => {
    const followListResponse = await request(app).get(
      `/v1/users/${ObjectID.objectIDToString(user._id!)}/follows`,
    );
    const followerListResponse = await request(app).get(
      `/v1/users/${ObjectID.objectIDToString(user._id!)}/followers`,
    );

    const userList = [
      {
        _id: ObjectID.objectIDToString(mockUser._id!),
        username: mockUser.username,
        profileImage: defaultProfileImage,
      },
    ];
    expect(followListResponse.body).toEqual({
      code: RESPONSECODE.SUCCESS,
      data: userList,
    });
    expect(followerListResponse.body).toEqual({
      code: RESPONSECODE.SUCCESS,
      data: userList,
    });
  });
});
