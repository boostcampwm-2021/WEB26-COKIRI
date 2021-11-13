import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { IoPaperPlaneOutline, IoChatbubbleOutline } from 'react-icons/io5';

import ProfileSet from 'src/components/sets/ProfileSet';
import CommentButton from 'src/components/buttons/CommentButton';
import LikeButton from 'src/components/buttons/LikeButton';
import EchoButton from 'src/components/buttons/EchoButton';
import PostImages from 'src/components/PostImages';
import PostContent from 'src/components/PostContent';
import PostReview from 'src/components/PostReview';
import LikeListButton from 'src/components/buttons/LikeListButton';
import LikeListModal from 'src/components/modals/LikeListModal';
import Card from 'src/components/cards/Common';
import { Row } from 'src/components/Grid';

import PostType from 'src/types/post';

import { DEFAULT_PROFILE_IMAGE, POST_CARD_WIDTH } from 'src/globals/constants';

import { Wrapper, Buttons } from './style';

interface Props {
  post: PostType;
}

function Post({ post }: Props) {
  const [isLikeListModal, setIsLikeListModal] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const handleClick = useCallback(() => setIsLikeListModal(true), []);
  const handleClose = useCallback(() => setIsLikeListModal(false), []);

  const profileImage = post.user.profileImage ?? DEFAULT_PROFILE_IMAGE;
  return (
    <Wrapper>
      <Card width={POST_CARD_WIDTH}>
        <ProfileSet image={profileImage} username={post.user.username} />
        {post.images.length !== 0 && <PostImages images={post.images} />}
        <Row justifyContent='flex-start'>
          <Buttons>
            <LikeButton post={post} setLikeCount={setLikeCount} />
            <CommentButton href={`/posts/${post._id}`}>
              <IoChatbubbleOutline />
            </CommentButton>
            <EchoButton href='echo/123'>
              <IoPaperPlaneOutline />
            </EchoButton>
          </Buttons>
        </Row>
        {likeCount !== 0 && <LikeListButton likeCount={likeCount} onClick={handleClick} />}
        <PostContent content={post.content} />
        <PostReview />
        {isLikeListModal && <LikeListModal post={post} onClose={handleClose} />}
      </Card>
    </Wrapper>
  );
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Post;
