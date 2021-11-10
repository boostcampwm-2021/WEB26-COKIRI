import { Schema, model, Types } from 'mongoose';

import { EchoRoomType, MessageType } from 'src/types';
import { Validate } from 'src/utils';

const messageSchema = new Schema<MessageType>(
  {
    userID: { type: Types.ObjectId, ref: 'User', validate: Validate.userObjectID },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false, required: true },
  },
  { timestamps: true },
);

const echoRoomSchema = new Schema<EchoRoomType>(
  {
    users: [{ type: Types.ObjectId, ref: 'User', required: true, validate: Validate.userObjectID }],
    messages: [messageSchema],
  },
  { versionKey: false, timestamps: { createdAt: false, updatedAt: true } },
);

export { messageSchema, echoRoomSchema };
export default model<EchoRoomType>('EchoRoom', echoRoomSchema);
