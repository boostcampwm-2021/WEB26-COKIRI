import { Validate } from 'src/utils';
import Post from './Post';
import User from './User';
import EchoRoom from './EchoRoom';
import Tag from './Tag';
import Language from './Language';

Validate.UserModel = User;
Validate.PostModel = Post;
Validate.TagModel = Tag;
Validate.EchoRoomModel = EchoRoom;
Validate.LanguageModel = Language;

export { Post, User, EchoRoom, Tag, Language };
