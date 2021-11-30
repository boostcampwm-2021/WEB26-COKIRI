import * as request from 'supertest';

import app from 'src/app';
import { Authorization, ObjectID } from 'src/utils';
import { User } from 'src/models';
import { connect, disconnect, dropDatabase } from 'src/test/mongoDBMemoryServer';
import { UserType } from 'src/types';
import { TistoryService, UserService } from 'src/services';

let token: string;

const user: UserType = {
  name: process.env.TEST_USER,
  username: process.env.TEST_USER,
  _id: ObjectID.stringToObjectID(process.env.TEST_USER_ID!),
  authProvider: 'google',
  authProviderID: process.env.TEST_USER,
  isRegistered: true,
};
const postImage = 'https://kr.object.ncloudstorage.com/cocoo/posts/test.png';

beforeAll(async () => {
  await connect();
});
afterAll(async () => {
  await disconnect();
});

describe('포스트 작성', () => {
  beforeAll(async () => {
    token = Authorization.createTestJWT(ObjectID.objectIDToString(user._id!));
    await User.create(user);

    jest.spyOn(TistoryService, 'findPostContent').mockResolvedValue({
      title: 'blog',
      link: 'link',
      type: 'tistory',
      identity: 'blog name',
      target: 'target',
      content: 'html content',
    });

    jest.spyOn(UserService, 'findUserGithubUsername').mockResolvedValue('dmin0211');
  });

  test('일반 포스트 작성', async () => {
    const response = await request(app)
      .post('/v1/posts')
      .send({ content: 'test normal post', userID: user._id, images: [postImage] })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  test('백준 연동 포스트 작성', async () => {
    const problemNumber = 1011;
    const externalResponse = await request(app).get(`/v1/problems/${problemNumber}`);
    expect(externalResponse.status).toBe(200);

    const response = await request(app)
      .post('/v1/posts')
      .send({
        content: 'test algorithm post',
        userID: user._id,
        images: [postImage],
        external: externalResponse.body.data,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.data.external).toEqual(externalResponse.body.data);
  });

  test('Tistory 연동 포스트 작성', async () => {
    const externalResponse = await request(app)
      .get(`/v1/users/${user._id}/tistory/identity/posts/postid`)
      .set('Authorization', `Bearer ${token}`);
    expect(externalResponse.status).toBe(200);

    const response = await request(app)
      .post('/v1/posts')
      .send({
        content: 'test blog post',
        userID: user._id,
        images: [postImage],
        external: externalResponse.body.data,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.data.external).toEqual(externalResponse.body.data);
  });

  test('깃허브 연동 포스트 작성', async () => {
    const externalResponse = await request(app)
      .get(`/v1/users/${user._id}/repositories/WEB26-COKIRI`)
      .set('Authorization', `Bearer ${token}`);
    expect(externalResponse.status).toBe(200);

    const response = await request(app)
      .post('/v1/posts')
      .send({
        content: 'test github post',
        userID: user._id,
        images: [postImage],
        external: externalResponse.body.data,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
