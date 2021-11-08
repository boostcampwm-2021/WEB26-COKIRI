import { IoHeartOutline, IoPaperPlaneOutline, IoChatbubbleOutline } from 'react-icons/io5';

import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import CommentButton from 'src/components/buttons/post/CommentButton';
import LikeButton from 'src/components/buttons/post/LikeButton';
import EchoButton from 'src/components/buttons/post/EchoButton';
import PostImage from 'src/components/Post/Image';
import PostLikeRow from 'src/components/Post/LikeRow';
import PostContent from 'src/components/Post/Content';
import PostReview from 'src/components/Post/Review';

import { Wrapper, IconRow } from './style';

function Post() {
  return (
    <Wrapper>
      <ProfileImageButton href='users/123'>image, username</ProfileImageButton>
      <PostImage />
      <IconRow>
        <CommentButton>
          <IoHeartOutline />
        </CommentButton>
        <LikeButton>
          <IoChatbubbleOutline />
        </LikeButton>

        <EchoButton href='echo/123'>
          <IoPaperPlaneOutline />
        </EchoButton>
      </IconRow>
      <PostLikeRow />
      <PostContent />
      <PostReview />
    </Wrapper>
  );
}

export default Post;
