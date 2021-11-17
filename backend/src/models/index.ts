import { Validate } from 'src/utils';
import Comment from './Comment';
import CommentLike from './CommentLike';
import DashboardHistory from './DashboardHistory';
import DashboardPost from './DashboardRepository';
import EchoMessage from './EchoMessage';
import EchoRoom from './EchoRoom';
import Follow from './Follow';
import Image from './Image';
import TechStack from './TechStack';
import Notify from './Notify';
import Post from './Post';
import PostLike from './PostLike';
import Tag from './Tag';
import User from './User';
import Blog from './Blog';

Validate.UserModel = User;
Validate.PostModel = Post;
Validate.TagModel = Tag;
Validate.EchoRoomModel = EchoRoom;
Validate.TechStackModel = TechStack;
Validate.NotifyModel = Notify;
Validate.PostLikeModel = PostLike;
Validate.ImageModel = Image;
Validate.FollowModel = Follow;
Validate.EchoMessageModel = EchoMessage;
Validate.DashboardPostModel = DashboardPost;
Validate.DashboardHistoryModel = DashboardHistory;
Validate.CommentModel = Comment;
Validate.CommentLikeModel = CommentLike;

export {
  Comment,
  CommentLike,
  DashboardHistory,
  DashboardPost,
  EchoMessage,
  EchoRoom,
  Follow,
  Image,
  TechStack,
  Notify,
  Post,
  PostLike,
  Tag,
  User,
  Blog,
};
