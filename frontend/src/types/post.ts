import commentType from './comment';

export default interface postType {
  _id: string;
  content: string;
  images: string[];
  userID: string;
  likeCount: number;
  comments: commentType[];
  createdAt: Date;
  likes: string[];
}
