import { Schema, model, Types } from 'mongoose';

import { UserType, NotifyRangeType, NotifyType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const notifyRangeSchema = new Schema<NotifyRangeType>(
  {
    postLike: { type: Boolean, required: true, default: true },
    postComment: { type: Boolean, required: true, default: true },
    commentLike: { type: Boolean, required: true, default: true },
  },
  { _id: false },
);

const notifySchema = new Schema<NotifyType>(
  {
    type: {
      type: String,
      enum: ['postLike', 'postComment', 'commentLike', 'follow', 'follower'],
      required: true,
    },
    userID: { type: Types.ObjectId, ref: 'User', required: true },
    postID: { type: Types.ObjectId, ref: 'Post' },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

const userSchema = new Schema<UserType>(
  {
    name: { type: String, trim: true, default: '' },
    username: {
      type: String,
      trim: true,
      validate: [Validate.stringDigit(1, 20), '유저네임 형식이 잘못되었습니다.'],
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
    languages: [{ type: Types.ObjectId, required: true, ref: 'Language' }],
    posts: [{ type: Types.ObjectId, required: true, ref: 'Post' }],
    likes: [{ type: Types.ObjectId, required: true, ref: 'Post' }],
    followers: [{ type: Types.ObjectId, required: true, ref: 'User' }],
    follows: [{ type: Types.ObjectId, required: true, ref: 'User' }],
    notifyRange: notifyRangeSchema,
    notifies: [notifySchema],
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

export { notifySchema, userSchema };
export default model<UserType>('User', userSchema);
