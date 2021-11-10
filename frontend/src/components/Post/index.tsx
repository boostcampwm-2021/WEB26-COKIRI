import { IoHeartOutline, IoPaperPlaneOutline, IoChatbubbleOutline } from 'react-icons/io5';
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

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

import PostType from 'src/types/post';

import { Wrapper, Buttons } from './style';

interface Props {
  post?: PostType;
}

function Post({ post }: Props) {
  const [isLikeListModal, setIsLikeListModal] = useState(false);
  const openModal = useCallback(() => setIsLikeListModal(true), []);
  const closeModal = useCallback(() => setIsLikeListModal(false), []);
  const writer = 'tiger';
  const images: string[] = [];
  const likeCount = 3;
  return (
    <Wrapper>
      <Profile href={`users/${writer}`} imageSrc='/images/logo.svg' userName={writer} />
      <PostImages images={images} />
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
      <LikeListButton length={likeCount} handleClick={openModal} />
      <PostContent content='hihi' />
      <PostReview />
      {isLikeListModal && <LikeListModal onClose={closeModal} />}
    </Wrapper>
  );
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any),
};

Post.defaultProps = {
  post: [],
};
export default Post;
