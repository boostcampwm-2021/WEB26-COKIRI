import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const dbName: string | undefined = process.env.DB_NAME;
let mongod: MongoMemoryServer | undefined;

export async function connect() {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.connect(`${uri}${dbName}?directConnection=true`, { dbName }, (err) => {
    if (err) {
      console.error('mongodb connection error', err);
    } else {
      console.log('mongodb connected');
    }
  });
}

export async function dropDatabase() {
  await mongoose.connection.dropDatabase();
}

export async function disconnect() {
  await mongoose.connection.close();
  await mongoose.disconnect();
  await mongod?.stop();
}
