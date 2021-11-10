import { IoHeartOutline, IoPaperPlaneOutline, IoChatbubbleOutline } from 'react-icons/io5';
import React, { useState, useCallback, useEffect } from 'react';

import Profile from 'src/components/Profile';
import CommentButton from 'src/components/buttons/CommentButton';
import LikeButton from 'src/components/buttons/LikeButton';
import EchoButton from 'src/components/buttons/EchoButton';
import PostImage from 'src/components/PostImage';
import PostContent from 'src/components/PostContent';
import PostReview from 'src/components/PostReview';
import { Row } from 'src/components/Grid';
import LikeListButton from 'src/components/buttons/LikeListButton';
import LikeListModal from 'src/components/modals/LikeListModal';

import { Wrapper, Buttons } from './style';

function Post() {
  const content = `asfdsgasfdafsd
  fasdafsdafsdafsdasfdfasdafsdasdfasfdasfdafsdasfdafsdafsdafdsaf
  dsafsdsdsdsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddds`;
  const [isLikeListModal, setIsLikeListModal] = useState(false);
  const changeModalState = useCallback(() => {
    setIsLikeListModal((prevState) => !prevState);
  }, []);

  return (
    <Wrapper>
      <Profile href='users/123' imageSrc='/images/logo.svg' userName='tiger' />
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
      <LikeListButton length='4' changeModalState={changeModalState} />
      <PostReview />
      {isLikeListModal && <LikeListModal onClose={changeModalState} />}
    </Wrapper>
  );
}

export default Post;
