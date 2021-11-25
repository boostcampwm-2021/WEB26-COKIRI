import * as AWS from 'aws-sdk';

export default (function objectStorageLoader() {
  const endpoint = new AWS.Endpoint(process.env.STORAGE_END_POINT as string) as any;
  const region = 'kr-standard';
  const accessKey = process.env.STORAGE_ACCESS_KEY as string;
  const secretKey = process.env.STORAGE_SECRET_KEY as string;

  const S3 = new AWS.S3({
    endpoint,
    region,
    credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
  });

  return S3;
})();
