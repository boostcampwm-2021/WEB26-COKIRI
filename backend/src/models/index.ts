import { Validate } from 'src/utils';
import Comment from './Comment';
import CommentLike from './CommentLike';
import DashboardHistory from './DashboardHistory';
import DashboardPost from './DashboardPost';
import EchoMessage from './EchoMessage';
import EchoRoom from './EchoRoom';
import Follow from './Follow';
import Image from './Image';
import Language from './Language';
import Notify from './Notify';
import Post from './Post';
import Postlike from './Postlike';
import Tag from './Tag';
import User from './User';

Validate.UserModel = User;
Validate.PostModel = Post;
Validate.TagModel = Tag;
Validate.EchoRoomModel = EchoRoom;
Validate.LanguageModel = Language;
Validate.NotifyModel = Notify;

export {
  Comment,
  CommentLike,
  DashboardHistory,
  DashboardPost,
  EchoMessage,
  EchoRoom,
  Follow,
  Image,
  Language,
  Notify,
  Post,
  Postlike,
  Tag,
  User,
};
