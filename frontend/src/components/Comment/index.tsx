import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import UsernameButton from 'src/components/buttons/UsernameButton';
import CommentLikeButton from 'src/components/buttons/CommentLikeButton';
import CommentDeleteButton from 'src/components/buttons/deletes/CommentDeleteButton';
import { Row, Spacer } from 'src/components/Grid';

import {
  COMMENT_PROFILE_IMAGE_SIZE,
  COMMENT_PROFILE_IMAGE_BUTTON_MARGIN_RIGHT,
  COMMENT_USERNAME_BUTTON_MARGIN_RIGHT,
  COMMENT_LIKE_BUTTON_MARGIN,
  COMMENT_USERNAME_BUTTON_WIDTH,
} from 'src/globals/constants';

import { CommentType } from 'src/types';

import userAtom from 'src/recoil/user';

import TimeFromNow from 'src/components/TimeFromNow';
import { Content } from './style';

interface Props {
  postID: string;
  comment: CommentType;
  // eslint-disable-next-line no-unused-vars
  onCommentDelete: (commentID: string) => void;
}

function Comment({ postID, comment, onCommentDelete }: Props) {
  const user = useRecoilValue(userAtom);
  const { _id, createdAt, content, user: targetUser, likes } = comment;
  const commentLikes = likes ?? [];
  const isMe = user._id === comment.user!._id;

  return (
    <Row alignItems='center'>
      <ProfileImageButton
        size={COMMENT_PROFILE_IMAGE_SIZE}
        marginRight={COMMENT_PROFILE_IMAGE_BUTTON_MARGIN_RIGHT}
        profileImage={targetUser!.profileImage}
        username={targetUser!.username!}
      />
      <UsernameButton
        marginRight={COMMENT_USERNAME_BUTTON_MARGIN_RIGHT}
        width={COMMENT_USERNAME_BUTTON_WIDTH}
        username={targetUser!.username!}
      />
      <Content>{content}</Content>
      <Spacer />
      <TimeFromNow time={createdAt!} />
      {isMe && (
        <CommentDeleteButton postID={postID} commentID={_id!} onCommentDelete={onCommentDelete} />
      )}
      <CommentLikeButton
        margin={COMMENT_LIKE_BUTTON_MARGIN}
        postID={postID}
        commentID={_id!}
        commentLikes={commentLikes}
      />
    </Row>
  );
}

Comment.propTypes = {
  postID: PropTypes.string.isRequired,
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  onCommentDelete: PropTypes.func.isRequired,
};

export default Comment;
