import { Schema, model, Types } from 'mongoose';

import { UserType, NotifyRangeType, DashboardType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const notifyRangeSchema = new Schema<NotifyRangeType>(
  {
    postLike: { type: Boolean, required: true, default: true },
    postComment: { type: Boolean, required: true, default: true },
    commentLike: { type: Boolean, required: true, default: true },
  },
  { _id: false },
);

const dashboardSchema = new Schema<DashboardType>(
  {
    github: { type: String, validate: [Validate.url, 'URL 형식이 잘못되었습니다.'] },
    blog: { type: String, validate: [Validate.url, 'URL 형식이 잘못되었습니다.'] },
    solvedac: { type: String, validate: [Validate.url, 'URL 형식이 잘못되었습니다.'] },
    email: { type: String, validate: [Validate.email, 'Email 형식이 잘못되었습니다.'] },
    profileImage: { type: String, validate: [Validate.url, 'URL 형식이 잘못되었습니다.'] },
    jobObjectives: [{ type: String, required: true }],
  },
  { _id: false },
);

const userSchema = new Schema<UserType>(
  {
    name: { type: String, trim: true, default: '' },
    username: {
      type: String,
      trim: true,
      validate: [Validate.urlSafeStringDigit(1, 20), '유저네임 형식이 잘못되었습니다.'],
      unique: true,
    },
    githubUsername: { type: String, trim: true },
    blogAuthentication: {
      tistory: String,
      velog: {
        token: String,
        ttl: Number,
        createdAt: Date,
      },
    },
    profileImage: {
      type: String,
      validate: [Validate.url, 'URL 형식이 잘못되었습니다.'],
      default: '/images/default_profile_image.jpg',
    },
    authProvider: { type: String, enum: ['kakao', 'google', 'github'], required: true },
    authProviderID: { type: String, required: true },
    isRegistered: { type: Boolean, require: true, default: false },
    phoneNumber: {
      type: String,
      //  @TODO phone number string validate
    },
    sex: { type: String, enum: ['male', 'female'] },
    birthday: { type: Date },
    bio: { type: String, trim: true },
    school: { type: String, trim: true },
    company: { type: String, trim: true },
    region: { type: String, trim: true },
    languages: [
      {
        type: Types.ObjectId,
        required: true,
        ref: 'Language',
        validate: Validate.languageObjectID,
      },
    ],
    notifyRange: notifyRangeSchema,
    dashboard: dashboardSchema,
    lastVisitedAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

export default model<UserType>('User', userSchema);
