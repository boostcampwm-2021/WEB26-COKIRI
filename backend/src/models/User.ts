import { Schema, model } from 'mongoose';
import {
  UserType,
  LanguageIDType,
  PostIDType,
  UserIDType,
  NotifyRangeType,
  NotifyType,
} from 'src/types/modelType';
import { Validate } from 'src/utils';

const languageIDSchema = new Schema<LanguageIDType>(
  {
    languageID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Language',
    },
  },
  { _id: false },
);

const postIDSchema = new Schema<PostIDType>(
  {
    postID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
  },
  { _id: false },
);

const userIDSchema = new Schema<UserIDType>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { _id: false },
);

const notifyRangeSchema = new Schema<NotifyRangeType>({
  postLike: {
    type: Boolean,
    required: true,
    default: true,
  },
  postComment: {
    type: Boolean,
    required: true,
    default: true,
  },
  commentLike: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const notifySchema = new Schema<NotifyType>({
  type: {
    type: String,
    enum: ['postLike', 'postComment', 'commentLike', 'follow', 'follower'],
    required: true,
  },
  userID: userIDSchema,
  postID: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
});

const userSchema = new Schema<UserType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [Validate.numberDigit(0, 20), '길이 제한'],
    },
    profileImage: {
      type: String,
      validate: [Validate.url, 'URL 형식이 잘못되었습니다.'],
    },
    authProvider: {
      type: String,
      enum: ['kakao', 'google', 'github'],
      required: true,
    },
    phoneNumber: {
      type: Number,
      validate: [Validate.numberDigit(10, 11), '전화번호 형식이 잘못되었습니다.'],
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    birthday: { type: Date },
    bio: {
      type: String,
      trim: true,
    },
    school: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    region: {
      type: String,
      trim: true,
    },
    languages: [languageIDSchema],
    posts: [postIDSchema],
    likes: [postIDSchema],
    followers: [userIDSchema],
    follows: [userIDSchema],
    notifyRange: notifyRangeSchema,
    notifies: [notifySchema],
    dashboard: {
      github: { type: String },
      blog: {
        type: String,
        validate: [Validate.url, 'URL 형식이 잘못되었습니다.'],
      },
      solvedac: {
        type: String,
        validate: [Validate.url, 'URL 형식이 잘못되었습니다.'],
      },
      histories: [
        {
          date: { type: Date },
          content: { type: String },
        },
      ],
      email: {
        type: String,
        validate: [Validate.email, 'Email 형식이 잘못되었습니다.'],
      },
      profileImage: {
        type: String,
        validate: [Validate.url, 'URL 형식이 잘못되었습니다.'],
      },
      jobObjectives: [{ jobObject: String }],
    },
  },
  { timestamps: true },
);

export default model<UserType>('User', userSchema);
