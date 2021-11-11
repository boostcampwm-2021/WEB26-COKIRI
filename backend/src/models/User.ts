import { Schema, model, Types } from 'mongoose';

import { UserType, NotifyRangeType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const notifyRangeSchema = new Schema<NotifyRangeType>(
  {
    postLike: { type: Boolean, required: true, default: true },
    postComment: { type: Boolean, required: true, default: true },
    commentLike: { type: Boolean, required: true, default: true },
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
    isRegistered: { type: Boolean, require: true, default: false },
    profileImage: { type: String, validate: [Validate.url, 'URL 형식이 잘못되었습니다.'] },
    authProvider: { type: String, enum: ['kakao', 'google', 'github'], required: true },
    authProviderID: { type: String, required: true },
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
    likes: [{ type: Types.ObjectId, required: true, ref: 'Post', validate: Validate.postObjectID }],
    followers: [
      { type: Types.ObjectId, required: true, ref: 'User', validate: Validate.userObjectID },
    ],
    follows: [
      { type: Types.ObjectId, required: true, ref: 'User', validate: Validate.userObjectID },
    ],
    notifyRange: notifyRangeSchema,
    tistoryAccessToken: String,
    tistoryURL: String,
    dashboard: {
      github: String,
      blog: { type: String, validate: [Validate.url, 'URL 형식이 잘못되었습니다.'] },
      solvedac: { type: String, validate: [Validate.url, 'URL 형식이 잘못되었습니다.'] },
      histories: [{ date: { type: Date }, content: { type: String } }],
      email: { type: String, validate: [Validate.email, 'Email 형식이 잘못되었습니다.'] },
      profileImage: { type: String, validate: [Validate.url, 'URL 형식이 잘못되었습니다.'] },
      jobObjectives: [{ jobObject: String }],
    },
  },
  { timestamps: true, versionKey: false },
);

export default model<UserType>('User', userSchema);
