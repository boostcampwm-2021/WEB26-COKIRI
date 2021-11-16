import { useState } from 'react';
import PropTypes from 'prop-types';

import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import UsernameButton from 'src/components/buttons/UsernameButton';
import CommentLikeButton from 'src/components/buttons/CommentLikeButton';
import { Row } from 'src/components/Grid';

import {
  COMMENT_PROFILE_IMAGE_SIZE,
  COMMENT_PROFILE_IMAGE_BUTTON_MARGIN_RIGHT,
  COMMENT_USERNAME_BUTTON_MARGIN_RIGHT,
  COMMENT_LIKE_BUTTON_MARGIN,
} from 'src/globals/constants';

import { CommentType } from 'src/types';

interface Props {
  postID: string;
  comment: CommentType;
}

function Comment({ postID, comment }: Props) {
  const [likeCount, setLikeCount] = useState(comment.likes?.length ?? 0);
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
        />
        <p>{comment.content}</p>
      </Row>
      <Row justifyContent='flex-end' alignItems='center'>
        {likeCount !== 0 && <p>좋아요{likeCount}개</p>}
        <CommentLikeButton
          postID={postID}
          commentID={comment._id!}
          commentLikes={comment.likes!}
          setLikeCount={setLikeCount}
          margin={COMMENT_LIKE_BUTTON_MARGIN}
        />
      </Row>
    </Row>
  );
}

Comment.propTypes = {
  postID: PropTypes.string.isRequired,
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Comment;
