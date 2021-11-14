import { Schema, model, Types } from 'mongoose';

import { EchoRoomType } from 'src/types';
import { Validate } from 'src/utils';

const echoRoomSchema = new Schema<EchoRoomType>(
  {
    users: [{ type: Types.ObjectId, ref: 'User', required: true, validate: Validate.userObjectID }],
  },
  { versionKey: false },
);

export default model<EchoRoomType>('EchoRoom', echoRoomSchema);
