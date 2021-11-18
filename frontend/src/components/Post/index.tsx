import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import ProfileSet from 'src/components/sets/ProfileSet';
import CommentButton from 'src/components/buttons/CommentButton';
import LikeButton from 'src/components/buttons/LikeButton';
import EchoButton from 'src/components/buttons/EchoButton';
import PostImages from 'src/components/images/PostImages';
import PostContent from 'src/components/PostContent';
import PostComments from 'src/components/PostComments';
import LikesButton from 'src/components/buttons/LikesButton';
import CardCommon from 'src/components/cards/Common';
import CommentInput from 'src/components/inputs/CommentInput';
import PostEditButton from 'src/components/buttons/deletes/PostDeleteButton';
import { Row } from 'src/components/Grid';

import { CommentType, PostType } from 'src/types';

import { POST_CARD_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';

interface Props {
  post: PostType;
}

function Post({ post }: Props) {
  const me = useRecoilValue(userAtom);
  const [likeCount, setLikeCount] = useState(post.likes!.length);
  const [comments, setComments] = useState<CommentType[]>([]);
  useEffect(() => {
    setComments(post.comments!);
  }, [post.comments]);
  useEffect(() => {
    setLikeCount(post.likes!.length);
  }, [post.likes]);
  const { _id, user, images, content, likes } = post;
  const isMyPost = me._id === user!._id;
  return (
    <CardCommon width={POST_CARD_WIDTH}>
      <Row justifyContent='space-between'>
        <ProfileSet profileImage={user!.profileImage} username={user!.username!} />
        {isMyPost && <PostEditButton postID={_id!} />}
      </Row>
      {images!.length !== 0 && <PostImages images={images!} />}
      <Row>
        <LikeButton postID={_id!} postLikes={likes!} setLikeCount={setLikeCount} />
        <CommentButton postID={_id!} />
        <EchoButton postID={_id!} />
      </Row>
      {likeCount !== 0 && <LikesButton postID={_id!} likeCount={likeCount} />}
      <PostContent content={content!} />
      <PostComments postID={_id!} comments={comments} setComments={setComments} />
      <CommentInput postID={_id!} setComments={setComments} />
    </CardCommon>
  );
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Post;
