import * as request from 'supertest';

import app from 'src/app';
import { Authorization, ObjectID } from 'src/utils';
import { User } from 'src/models';
import { connect, disconnect, dropDatabase } from 'src/test/mongoDBMemoryServer';
import { CommentLikeType, CommentType, PostLikeType, UserType } from 'src/types';
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
const defaultImage = '/images/default_profile_image.jpg';
const postImage = 'https://kr.object.ncloudstorage.com/cocoo/posts/test.png';

beforeAll(async () => {
  await connect();
  token = Authorization.createTestJWT(ObjectID.objectIDToString(user._id!));
});

afterAll(async () => {
  await disconnect();
});

describe('포스트 작성', () => {
  beforeAll(async () => {
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

  afterAll(async () => {
    await dropDatabase();
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

describe('타임라인', () => {
  let posts: any[];
  let mockPostLike: PostLikeType;
  let mockComment: CommentType;
  let mockCommentLike: CommentLikeType;

  beforeAll(async () => {
    await User.create(user);
    await request(app)
      .post('/v1/posts')
      .send({ content: 'test normal post', userID: user._id, images: [postImage] })
      .set('Authorization', `Bearer ${token}`);
  });

  test('타임라인 불러오기', async () => {
    const response = await request(app)
      .get(`/v1/posts`)
      .query({ user_id: ObjectID.objectIDToString(user._id!), cursor: 0 })
      .set('Authorization', `Bearer ${token}`);
    posts = response.body.data;
    expect(posts).toHaveLength(1);
    expect(posts[0]).toHaveProperty('comments');
    expect(posts[0]).toHaveProperty('likes');
    expect(posts[0].comments).toHaveLength(0);
    expect(posts[0].likes).toHaveLength(0);
    expect(response.status).toBe(200);
  });

  test('댓글 작성', async () => {
    const response = await request(app)
      .post(`/v1/posts/${posts[0]._id}/comments`)
      .send({ userID: ObjectID.objectIDToString(user._id!), content: '댓글 test' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    mockComment = response.body.data;
    expect(Object.keys(mockComment)).toMatchObject([
      '_id',
      'content',
      'createdAt',
      'updatedAt',
      'user',
    ]);
  });

  test('포스트 좋아요', async () => {
    const response = await request(app)
      .post(`/v1/posts/${posts[0]._id}/likes`)
      .send({ userID: ObjectID.objectIDToString(user._id!) })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    mockPostLike = response.body.data;
  });

  test('댓글 좋아요', async () => {
    const response = await request(app)
      .post(`/v1/posts/${posts[0]._id}/comments/${mockComment._id}/likes`)
      .send({ userID: ObjectID.objectIDToString(user._id!) })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    mockCommentLike = response.body.data;
  });

  test('타임라인 다시 불러오기', async () => {
    const response = await request(app)
      .get(`/v1/posts`)
      .query({ user_id: ObjectID.objectIDToString(user._id!), cursor: 0 })
      .set('Authorization', `Bearer ${token}`);
    const newTimeline = response.body.data;
    expect(newTimeline).toHaveLength(1);
    const { comments, likes } = newTimeline[0];
    const likeUser = {
      _id: ObjectID.objectIDToString(user._id!),
      username: user.username,
      profileImage: defaultImage,
    };
    expect(comments).toEqual([
      {
        ...mockComment,
        likes: [
          {
            user: likeUser,
            _id: mockCommentLike._id,
            createdAt: comments[0].likes[0].createdAt,
          },
        ],
      },
    ]);
    expect(likes).toEqual([
      { user: likeUser, _id: mockPostLike._id, createdAt: likes[0].createdAt },
    ]);
    expect(response.status).toBe(200);
  });
});
