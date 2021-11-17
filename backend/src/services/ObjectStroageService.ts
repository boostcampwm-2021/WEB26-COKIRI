import S3 from 'src/utils/ObjectStorage';

class ObjectStroageService {
  async deleteObject(objectName: string) {
    return S3.deleteObject({
      Bucket: 'cocoo',
      Key: objectName,
    }).promise();
  }
}

export default new ObjectStroageService();
