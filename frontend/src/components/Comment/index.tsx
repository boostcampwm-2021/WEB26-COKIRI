import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import CommentLikeButton from 'src/components/buttons/CommentLikeButton';
import CommentDeleteButton from 'src/components/buttons/deletes/CommentDeleteButton';
import ProfileButton from 'src/components/buttons/ProfileButton';
import { Row, Spacer } from 'src/components/Grid';

import { COMMENT_LIKE_BUTTON_MARGIN } from 'src/globals/constants';

import { CommentType } from 'src/types';

import userAtom from 'src/recoil/user';

import { Content } from './style';

const TimeFromNow = dynamic(() => import('src/components/TimeFromNow'), {
  ssr: false,
});

interface Props {
  postID: string;
  comment: CommentType;
  onCommentDelete: Function;
}

function Comment({ postID, comment, onCommentDelete }: Props) {
  const user = useRecoilValue(userAtom);
  const { _id, createdAt, content, user: targetUser, likes } = comment;
  const commentLikes = likes ?? [];
  const isMe = user._id === comment.user!._id;

  return (
    <Row alignItems='center'>
      <ProfileButton profileImage={targetUser?.profileImage} username={targetUser!.username!} />
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
