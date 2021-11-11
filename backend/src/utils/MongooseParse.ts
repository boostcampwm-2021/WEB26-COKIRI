import { ObjectType } from 'src/types';

class MongooseParse {
  convertPropertyInLikes(
    array: ObjectType<any>[],
    propertyMap: ObjectType<{ oldKey: string; newKey: string }>[],
  ) {
    const newArray = array.map((element) => {
      let newElement = { ...element.toObject() };
      propertyMap.forEach((property) => {
        newElement[property.newKey] = newElement[property.oldKey];
        delete newElement[property.oldKey];
      });
      newElement = { ...newElement, ...newElement.user };
      delete newElement.user;
      return newElement;
    });
    return newArray;
  }

  convertProperty(
    obj: ObjectType<any>,
    propertyMap: ObjectType<{ oldKey: string; newKey: string }>[],
  ) {
    const newObject = { ...obj.toObject() };
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
        : this.convertPropertyInLikes(post.likes, [{ oldKey: 'userID', newKey: 'user' }]);
      newPost.likes = likes;
      const comments = post.comments.map((comment: ObjectType<any>) => {
        const newComment = this.convertProperty(comment, [{ oldKey: 'userID', newKey: 'user' }]);
        const commentLikes = !comment.likes
          ? []
          : this.convertPropertyInLikes(comment.likes, [{ oldKey: 'userID', newKey: 'user' }]);

        newComment.likes = commentLikes;
        return newComment;
      });
      newPost.comments = comments;
      return newPost;
    });
  }
}

export default new MongooseParse();
