import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ProfileSet from 'src/components/sets/ProfileSet';
import CommentButton from 'src/components/buttons/CommentButton';
import LikeButton from 'src/components/buttons/LikeButton';
import EchoButton from 'src/components/buttons/EchoButton';
import PostImages from 'src/components/PostImages';
import PostContent from 'src/components/PostContent';
import PostReview from 'src/components/PostReview';
import LikesButton from 'src/components/buttons/LikesButton';
import Card from 'src/components/cards/Common';
import { Row } from 'src/components/Grid';

import PostType from 'src/types/post';

import { POST_CARD_WIDTH } from 'src/globals/constants';

interface Props {
  post: PostType;
}

function Post({ post }: Props) {
  const [likeCount, setLikeCount] = useState(post.likes.length);

  return (
    <Card width={POST_CARD_WIDTH}>
      <ProfileSet profileImage={post.user.profileImage} username={post.user.username} />
      {post.images.length !== 0 && <PostImages images={post.images} />}
      <Row justifyContent='start'>
        <LikeButton post={post} setLikeCount={setLikeCount} />
        <CommentButton postID={post._id} />
        <EchoButton postID={post._id} />
      </Row>
      {likeCount !== 0 && <LikesButton postID={post._id} likeCount={likeCount} />}
      <PostContent content={post.content} />
      <PostReview />
    </Card>
  );
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Post;
