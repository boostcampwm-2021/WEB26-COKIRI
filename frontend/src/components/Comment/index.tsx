import { Dispatch, SetStateAction, useState } from 'react';
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
} from 'src/globals/constants';

import { CommentType } from 'src/types';

import userAtom from 'src/recoil/user';

interface Props {
  postID: string;
  comment: CommentType;
  setComments: Dispatch<SetStateAction<CommentType[]>>;
}

function Comment({ postID, comment, setComments }: Props) {
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
        />
        <p>{comment.content}</p>
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
          setComments={setComments}
          hidden={hidden}
        />
      </Row>
    </Row>
  );
}

Comment.propTypes = {
  postID: PropTypes.string.isRequired,
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  setComments: PropTypes.func.isRequired,
};

export default Comment;
