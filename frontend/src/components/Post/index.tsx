import { IoHeartOutline, IoPaperPlaneOutline, IoChatbubbleOutline } from 'react-icons/io5';

import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import ProfileUserNameButton from 'src/components/buttons/profileUserNameButton';
import CommentButton from 'src/components/buttons/post/CommentButton';
import LikeButton from 'src/components/buttons/post/LikeButton';
import EchoButton from 'src/components/buttons/post/EchoButton';
import PostImage from 'src/components/Post/Image';
import PostLikeRow from 'src/components/Post/LikeRow';
import PostContent from 'src/components/Post/Content';
import PostReview from 'src/components/Post/Review';
import { Row } from 'src/components/Grid';

import { Wrapper, Buttons } from './style';

function Post() {
  return (
    <Wrapper>
      <Row justifyContent='flex-start'>
        <ProfileImageButton href='users/123' imgSrc='/images/logo.svg' usage='post' />
        <ProfileUserNameButton href='user/123' userName='tiger' usage='post' />
      </Row>
      <PostImage />
      <Row justifyContent='flex-start'>
        <Buttons>
          <CommentButton>
            <IoHeartOutline />
          </CommentButton>
          <LikeButton>
            <IoChatbubbleOutline />
          </LikeButton>
          <EchoButton href='echo/123'>
            <IoPaperPlaneOutline />
          </EchoButton>
        </Buttons>
      </Row>
      <PostLikeRow />
      <PostContent />
      <PostReview />
    </Wrapper>
  );
}

export default Post;
