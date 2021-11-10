import { Validate } from 'src/utils';
import Post from './Post';
import User from './User';
import EchoRoom from './EchoRoom';
import Tag from './Tag';
import Language from './Language';
import Notify from './Notify';

Validate.UserModel = User;
Validate.PostModel = Post;
Validate.TagModel = Tag;
Validate.EchoRoomModel = EchoRoom;
Validate.LanguageModel = Language;
Validate.NotifyModel = Notify;

export { Post, User, EchoRoom, Tag, Language, Notify };
