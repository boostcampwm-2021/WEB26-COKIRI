import { Image } from 'src/models';
import { ObjectStroageService } from 'src/services';

class ImageService {
  async findPostImage(postID: string) {
    return Image.find({ targetID: postID }, '-targetID');
  }

  async removePostImage(postID: string) {
    const imageUrlList = await Image.find({ targetID: postID }, 'url -_id');
    imageUrlList.map((v) => ObjectStroageService.deleteObject(v.url as string));
    await Promise.all(imageUrlList);
    return Image.deleteMany({ targetID: postID });
  }
}

export default new ImageService();
