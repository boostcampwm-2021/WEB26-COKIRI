import { Image } from 'src/models';
import { ObjectStroageService } from 'src/services';
import { URLParser } from 'src/utils';

class ImageService {
  async findPostImage(postID: string) {
    return Image.find({ targetID: postID }, '-targetID');
  }

  async removePostImage(postID: string) {
    const imageUrlList = await Image.find({ targetID: postID }, 'url -_id');
    const promiseList = imageUrlList.map((v) =>
      ObjectStroageService.deleteObject(URLParser.splitObjectUrl(v.url as string)),
    );
    await Promise.all(promiseList);
    return Image.deleteMany({ targetID: postID });
  }
}

export default new ImageService();
