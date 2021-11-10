import { IoHeartOutline, IoPaperPlaneOutline, IoChatbubbleOutline } from 'react-icons/io5';
import React, { useState, useCallback } from 'react';

import Profile from 'src/components/Profile';
import CommentButton from 'src/components/buttons/CommentButton';
import LikeButton from 'src/components/buttons/LikeButton';
import EchoButton from 'src/components/buttons/EchoButton';
import PostImages from 'src/components/PostImages';
import PostContent from 'src/components/PostContent';
import PostReview from 'src/components/PostReview';
import { Row } from 'src/components/Grid';
import LikeListButton from 'src/components/buttons/LikeListButton';
import LikeListModal from 'src/components/modals/LikeListModal';

import { Wrapper, Buttons } from './style';

function Post() {
  const [isLikeListModal, setIsLikeListModal] = useState(false);
  const openModal = useCallback(() => setIsLikeListModal(true), []);
  const closeModal = useCallback(() => setIsLikeListModal(false), []);

  return (
    <Wrapper>
      <Profile href='users/123' imageSrc='/images/logo.svg' userName='tiger' />
      <PostImages />
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
      <LikeListButton length='4' handleClick={openModal} />
      <PostContent content={'hihi'} />
      <PostReview />
      {isLikeListModal && <LikeListModal onClose={closeModal} />}
    </Wrapper>
  );
}

export default Post;
