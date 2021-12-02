import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import ProfileButton from 'src/components/buttons/ProfileButton';
import DetailButton from 'src/components/buttons/DetailButton';
import LikeButton from 'src/components/buttons/LikeButton';
import PostImages from 'src/components/images/PostImages';
import NormalContent from 'src/components/contents/NormalContent';
import PostComments from 'src/components/PostComments';
import LikesButton from 'src/components/buttons/LikesButton';
import CardCommon from 'src/components/cards/Common';
import CommentInput from 'src/components/inputs/CommentInput';
import PostDeleteButton from 'src/components/buttons/deletes/PostDeleteButton';
import ExternalContent from 'src/components/contents/ExternalContent';
import { Row, Spacer } from 'src/components/Grid';

import { CommentType, PostType } from 'src/types';

import { POST_WIDTH } from 'src/globals/constants';

import userAtom, { isAuthenticatedSelector } from 'src/recoil/user';

const TimeFromNow = dynamic(() => import('src/components/TimeFromNow'), {
  ssr: false,
});

interface Props {
  post: PostType;
  onLoad: VoidFunction;
  onResize: VoidFunction;
  onLikes: Function;
  onPostDelete: Function;
}

function Post({ post, onPostDelete, onLoad, onResize, onLikes }: Props) {
  const user = useRecoilValue(userAtom);
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

  const [likeCount, setLikeCount] = useState(post.likes?.length ?? 0);
  const [comments, setComments] = useState(post.comments!);
  useEffect(() => setComments(post.comments ?? []), [post]);
  useEffect(() => setLikeCount(post.likes?.length ?? 0), [post]);
  const handleCommentWrite = (comment: CommentType) => {
    setComments((prevState: CommentType[]) => [...prevState, comment]);
    onResize();
  };
  const handleCommentDelete = (commentID: string) => {
    setComments((prevState: CommentType[]) =>
      [...prevState].filter((comment) => comment._id !== commentID),
    );
    onResize();
  };
  const handleLike = () => setLikeCount((prevState) => prevState + 1);
  const handleDislike = () => setLikeCount((prevState) => prevState - 1);

  const { _id, user: targetUser, images, content, likes, createdAt, external } = post;
  const isMe = user._id !== targetUser?._id;

  return (
    <CardCommon width={POST_WIDTH}>
      <Row alignItems='center'>
        <ProfileButton profileImage={targetUser?.profileImage} username={targetUser?.username!} />
        <TimeFromNow time={createdAt!} />
        <Spacer />
        {!isMe && <PostDeleteButton postID={_id!} onPostDelete={onPostDelete} />}
      </Row>
      {images?.length !== 0 && <PostImages images={images ?? []} onLoad={onLoad} />}
      <Row>
        <DetailButton postID={_id!} />
        {isAuthenticated && (
          <LikeButton
            postID={_id!}
            postLikes={likes ?? []}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        )}
        {likeCount !== 0 && <LikesButton postID={_id!} likeCount={likeCount!} onLikes={onLikes} />}
      </Row>
      {external !== undefined && <ExternalContent external={external} onExpand={onResize} />}
      <NormalContent content={content ?? ''} onExpand={onResize} />
      <PostComments
        postID={_id!}
        comments={comments}
        onCommentDelete={handleCommentDelete}
        onExpand={onResize}
      />
      {isAuthenticated && <CommentInput postID={_id!} onCommentWrite={handleCommentWrite} />}
    </CardCommon>
  );
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  onLoad: PropTypes.func,
  onResize: PropTypes.func,
  onLikes: PropTypes.func,
  onPostDelete: PropTypes.func.isRequired,
};

Post.defaultProps = {
  onLoad: () => {},
  onResize: () => {},
  onLikes: () => {},
};

export default Post;
