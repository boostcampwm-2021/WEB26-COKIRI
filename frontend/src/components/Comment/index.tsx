import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import CommentLikeButton from 'src/components/buttons/CommentLikeButton';
import CommentDeleteButton from 'src/components/buttons/deletes/CommentDeleteButton';
import TimeFromNow from 'src/components/TimeFromNow';
import ProfileSet from 'src/components/sets/ProfileSet';
import { Row, Spacer } from 'src/components/Grid';

import { COMMENT_LIKE_BUTTON_MARGIN } from 'src/globals/constants';

import { CommentType } from 'src/types';

import userAtom from 'src/recoil/user';

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
      <ProfileSet profileImage={targetUser?.profileImage} username={targetUser!.username!} />
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
