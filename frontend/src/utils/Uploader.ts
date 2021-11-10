import AWS from 'aws-sdk';
import { nanoid } from 'nanoid';

const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET as string;
const endpoint = process.env.NEXT_PUBLIC_STORAGE_END_POINT as string;
const accessKey = process.env.NEXT_PUBLIC_STORAGE_ACCESS_KEY as string;
const secretKey = process.env.NEXT_PUBLIC_STORAGE_SECRET_KEY as string;

const S3 = new AWS.S3({
  endpoint: new AWS.Endpoint(endpoint),
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
});

class Uploader {
  public static async uploadPostImage(image: File) {
    const key = `posts/${nanoid()}.${image.name.split('.').pop()}`;
    await S3.putObject({
      Bucket: bucket,
      Key: key,
      ACL: 'public-read',
      Body: image,
    }).promise();
    return `https://${endpoint}/${bucket}/${key}`;
  }
}

export default Uploader;
