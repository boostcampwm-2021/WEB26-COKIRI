import { Schema, model, Types } from 'mongoose';

import { EchoMessageType } from 'src/types';
import { Validate } from 'src/utils';

const echoMessageSchema = new Schema<EchoMessageType>(
  {
    roomID: { type: Types.ObjectId, ref: 'User', validate: Validate.echoRoomObjectID },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export default model<EchoMessageType>('EchoMessage', echoMessageSchema);
