import { Image } from 'src/models';

class ImageService {
  async findPostImage(postID: string) {
    return Image.find({ targetID: postID }, '-targetID');
  }
}

export default new ImageService();
