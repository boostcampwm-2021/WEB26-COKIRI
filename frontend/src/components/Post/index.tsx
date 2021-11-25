import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import ProfileSet from 'src/components/sets/ProfileSet';
import DetailButton from 'src/components/buttons/DetailButton';
import LikeButton from 'src/components/buttons/LikeButton';
import PostImages from 'src/components/images/PostImages';
import NormalContent from 'src/components/contents/NormalContent';
import PostComments from 'src/components/PostComments';
import LikesButton from 'src/components/buttons/LikesButton';
import CardCommon from 'src/components/cards/Common';
import CommentInput from 'src/components/inputs/CommentInput';
import PostDeleteButton from 'src/components/buttons/deletes/PostDeleteButton';
import TimeFromNow from 'src/components/TimeFromNow';
import ExternalContent from 'src/components/contents/ExternalContent';
import { Row, Spacer } from 'src/components/Grid';

import { CommentType, PostType } from 'src/types';

import { POST_WIDTH } from 'src/globals/constants';

import userAtom, { isAuthenticatedSelector } from 'src/recoil/user';

interface Props {
  post: PostType;
  onPostDelete: () => void;
}

function Post({ post, onPostDelete }: Props) {
  const user = useRecoilValue(userAtom);
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

  const [likeCount, setLikeCount] = useState(post.likes!.length);
  const [comments, setComments] = useState(post.comments!);

  const handleCommentWrite = (comment: CommentType) => {
    setComments((prevState: CommentType[]) => [...prevState, comment]);
  };
  const handleCommentDelete = (commentID: string) => {
    setComments((prevState: CommentType[]) =>
      [...prevState].filter((comment) => comment._id !== commentID),
    );
  };
  const { _id, user: targetUser, images, content, likes, createdAt, external } = post;
  const isMe = user._id !== targetUser!._id;

  return (
    <CardCommon width={POST_WIDTH}>
      <Row alignItems='center' marginBottom={10}>
        <ProfileSet profileImage={targetUser!.profileImage} username={targetUser!.username!} />
        <TimeFromNow time={createdAt!} />
        <Spacer />
        {!isMe && <PostDeleteButton postID={_id!} onPostDelete={onPostDelete} />}
      </Row>
      {images!.length !== 0 && <PostImages images={images!} />}
      <Row>
        {isAuthenticated && (
          <LikeButton postID={_id!} postLikes={likes!} setLikeCount={setLikeCount} />
        )}
        <DetailButton postID={_id!} />
      </Row>
      {likeCount !== 0 && <LikesButton postID={_id!} likeCount={likeCount} />}
      {external !== undefined && <ExternalContent external={external} />}
      <NormalContent content={content!} />
      <PostComments postID={_id!} comments={comments} onCommentDelete={handleCommentDelete} />
      {isAuthenticated && <CommentInput postID={_id!} onCommentWrite={handleCommentWrite} />}
    </CardCommon>
  );
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  onPostDelete: PropTypes.func.isRequired,
};

export default Post;
