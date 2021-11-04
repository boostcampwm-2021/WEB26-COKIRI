import * as mongoose from 'mongoose';

export default function mongooseLoader(): void {
  const dbUser: string | undefined = process.env.DB_USER;
  const dbPassword: string | undefined = process.env.DB_PASSWORD;
  const dbHost: string | undefined = process.env.DB_HOST;
  const dbPort: string | undefined = process.env.DB_PORT;
  const connectStr = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;
  mongoose.connect(connectStr, (err) => {
    if (err) {
      console.error('mongodb connection error', err);
    }
    console.log('mongodb connected');
  });
}
