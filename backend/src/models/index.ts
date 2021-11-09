import { Validate } from 'src/utils';
import Post, { postSchema, commentSchema, likeSchema } from './Post';
import User, { notifySchema, userSchema } from './User';
import EchoRoom, { echoRoomSchema, messageSchema } from './EchoRoom';
import Tag from './Tag';
import Language from './Language';

notifySchema.path('userID').validate(Validate.referenceObjectID(User));
notifySchema.path('postID').validate(Validate.referenceObjectID(Post));
userSchema.path('languages').validate(Validate.referenceObjectID(Language));
userSchema.path('posts').validate(Validate.referenceObjectID(Post));
userSchema.path('likes').validate(Validate.referenceObjectID(Post));
userSchema.path('followers').validate(Validate.referenceObjectID(User));
userSchema.path('follows').validate(Validate.referenceObjectID(User));

likeSchema.path('userID').validate(Validate.referenceObjectID(User));
commentSchema.path('userID').validate(Validate.referenceObjectID(User));
postSchema.path('userID').validate(Validate.referenceObjectID(User));
postSchema.path('tags').validate(Validate.referenceObjectID(Tag));

messageSchema.path('userID').validate(Validate.referenceObjectID(User));
echoRoomSchema.path('users').validate(Validate.referenceObjectID(User));

export { Post, User, EchoRoom, Tag, Language };
