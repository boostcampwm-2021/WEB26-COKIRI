import { ObjectType } from 'src/types';

class MongooseParse {
  convertPropertyInArray(
    array: ObjectType<any>[],
    propertyMap: ObjectType<{ oldKey: string; newKey: string }>[],
  ) {
    const newArray = array.map((element) => {
      const newElement = { ...element };
      propertyMap.forEach((property) => {
        newElement[property.newKey] = element[property.oldKey];
        delete newElement[property.oldKey];
      });
      return newElement;
    });
    return newArray;
  }

  convertProperty(
    obj: ObjectType<any>,
    propertyMap: ObjectType<{ oldKey: string; newKey: string }>[],
  ) {
    const newObject = { ...obj };
    propertyMap.forEach((property) => {
      newObject[property.newKey] = obj[property.oldKey];
      delete newObject[property.oldKey];
    });
    return newObject;
  }

  convertToPostArrayFormat(posts: ObjectType<any>[]) {
    return posts.map((post) => {
      const newPost = this.convertProperty(post, [{ oldKey: 'userID', newKey: 'user' }]);
      const likes = !post.likes
        ? []
        : this.convertPropertyInArray(post.likes, [{ oldKey: 'userID', newKey: 'user' }]);
      newPost.likes = likes;
      const comments = post.comments.map((comment: ObjectType<any>) => {
        const newComment = this.convertProperty(comment, [{ oldKey: 'userID', newKey: 'user' }]);
        const commentLikes = !comment.likes
          ? []
          : this.convertPropertyInArray(comment.likes, [{ oldKey: 'userID', newKey: 'user' }]);
        newComment.likes = commentLikes;
        return newComment;
      });
      newPost.comments = comments;
      return newPost;
    });
  }
}

export default new MongooseParse();
