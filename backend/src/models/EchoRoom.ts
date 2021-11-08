import { Schema, model } from 'mongoose';
import { EchoRoomType } from 'src/types';

const echoRoomSchema = new Schema<EchoRoomType>(
  {
    users: [{ type: Schema.Types.ObjectId, required: true }],
    messages: [
      {
        userID: { type: Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now, required: true },
        isRead: { type: Boolean, default: false, required: true },
      },
    ],
  },
  { versionKey: false },
);

export default model<EchoRoomType>('EchoRoom', echoRoomSchema);
