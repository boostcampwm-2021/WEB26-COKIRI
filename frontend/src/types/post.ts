import commentType from './comment';

export default interface postType {
  postId: string;
  content: string;
  writer: string;
  image?: string[];
  link?: string;
  likeCount: number;
  comments: commentType[];
}
