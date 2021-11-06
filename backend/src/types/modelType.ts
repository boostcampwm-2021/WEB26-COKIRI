import { Schema } from 'mongoose';

export interface EchoRoomType {
  users: Schema.Types.ObjectId[];
  messages: { userID: Schema.Types.ObjectId; content: string; createdAt: Date }[];
}
