import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import UsernameButton from 'src/components/buttons/UsernameButton';
import CommentLikeButton from 'src/components/buttons/CommentLikeButton';
import CommentDeleteButton from 'src/components/buttons/deletes/CommentDeleteButton';
import { Row } from 'src/components/Grid';

import {
  COMMENT_PROFILE_IMAGE_SIZE,
  COMMENT_PROFILE_IMAGE_BUTTON_MARGIN_RIGHT,
  COMMENT_USERNAME_BUTTON_MARGIN_RIGHT,
  COMMENT_LIKE_BUTTON_MARGIN,
  COMMENT_USERNAME_BUTTON_WIDTH,
} from 'src/globals/constants';

import { CommentType } from 'src/types';

import userAtom from 'src/recoil/user';

import { Content } from './style';

interface Props {
  postID: string;
  comment: CommentType;
  contentWidth: number;
  // eslint-disable-next-line no-unused-vars
  onCommentDelete: (commentID: string) => void;
}

function Comment({ postID, comment, contentWidth, onCommentDelete }: Props) {
  const user = useRecoilValue(userAtom);
  const commentLikes = comment.likes ?? [];
  const [likeCount, setLikeCount] = useState(commentLikes.length);
  const hidden = user._id !== comment.user._id;
  return (
    <Row justifyContent='space-between'>
      <Row alignItems='center'>
        <ProfileImageButton
          size={COMMENT_PROFILE_IMAGE_SIZE}
          profileImage={comment.user.profileImage}
          username={comment.user.username!}
          marginRight={COMMENT_PROFILE_IMAGE_BUTTON_MARGIN_RIGHT}
        />
        <UsernameButton
          username={comment.user.username!}
          marginRight={COMMENT_USERNAME_BUTTON_MARGIN_RIGHT}
          width={COMMENT_USERNAME_BUTTON_WIDTH}
        />
      </Row>
      <Row alignItems='center'>
        <Content width={contentWidth}>{comment.content}</Content>
      </Row>
      <Row justifyContent='flex-end' alignItems='center'>
        {likeCount !== 0 && <p>좋아요{likeCount}개</p>}
        <CommentLikeButton
          postID={postID}
          commentID={comment._id!}
          commentLikes={commentLikes}
          setLikeCount={setLikeCount}
          margin={COMMENT_LIKE_BUTTON_MARGIN}
        />
        <CommentDeleteButton
          postID={postID}
          commentID={comment._id}
          onCommentDelete={onCommentDelete}
          hidden={hidden}
        />
      </Row>
    </Row>
  );
}

Comment.propTypes = {
  postID: PropTypes.string.isRequired,
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  contentWidth: PropTypes.number.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
};

export default Comment;
