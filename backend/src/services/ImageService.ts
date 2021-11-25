import { Types } from 'mongoose';

import { Image } from 'src/models';
import { ObjectStorageService } from 'src/services';
import { URLParser } from 'src/utils';

class ImageService {
  async findPostImage(postID: string | Types.ObjectId) {
    return Image.find({ targetID: postID }, '-targetID');
  }

  async removePostImage(postID: string) {
    const imageUrlList = await Image.find({ targetID: postID }, 'url -_id');
    const promiseList = imageUrlList.map((v) =>
      ObjectStorageService.deleteObject(URLParser.splitObjectUrl(v.url as string)),
    );
    await Promise.all(promiseList);
    return Image.deleteMany({ targetID: postID });
  }
}

export default new ImageService();
