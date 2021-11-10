import { IoHeartOutline, IoPaperPlaneOutline, IoChatbubbleOutline } from 'react-icons/io5';

import PostProfile from 'src/components/PostProfile';
import CommentButton from 'src/components/buttons/CommentButton';
import LikeButton from 'src/components/buttons/LikeButton';
import EchoButton from 'src/components/buttons/EchoButton';
import PostImage from 'src/components/PostImage';
import PostContent from 'src/components/PostContent';
import PostReview from 'src/components/PostReview';
import { Row } from 'src/components/Grid';

import { Wrapper, Buttons } from './style';

function Post() {
  const content = `asfdsgasfdafsd
  fasdafsdafsdafsdasfdfasdafsdasdfasfdasfdafsdasfdafsdafsdafdsaf
  dsafsdsdsdsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddds`;

  return (
    <Wrapper>
      <PostProfile />
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
      <PostContent content={content} />
      <PostReview />
    </Wrapper>
  );
}

export default Post;
