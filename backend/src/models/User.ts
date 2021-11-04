import { Schema, model } from 'mongoose';

interface User {
  name: string;
}

const userSchema = new Schema<User>({});

export default model<User>('User', userSchema);
