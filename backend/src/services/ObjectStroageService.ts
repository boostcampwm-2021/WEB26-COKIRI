import S3 from 'src/utils/objectStorage';

class ObjectStroageService {
  async deleteObject(objectName: string) {
    await S3.deleteObject({
      Bucket: 'cocoo',
      Key: objectName,
    }).promise();
  }
}

export default new ObjectStroageService();
