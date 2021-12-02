import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import { IoCloseCircleOutline } from 'react-icons/io5';

import IconButton from 'src/components/buttons/IconButton';

import {
  COMMENT_DELETE_BUTTON_HEIGHT,
  COMMENT_DELETE_BUTTON_WIDTH,
  COMMENT_DELETE_BUTTON_SIZE,
} from 'src/globals/constants';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

interface Props {
  postID: string;
  commentID: string;
  onCommentDelete: Function;
}

function CommentDeleteButton({ postID, commentID, onCommentDelete }: Props) {
  const user = useRecoilValue(userAtom);

  const mutation = useMutation(() => Fetcher.deleteComment(user, postID, commentID), {
    onSuccess: () => onCommentDelete(commentID),
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <IconButton
      onClick={handleClick}
      title='comment-delete'
      height={COMMENT_DELETE_BUTTON_HEIGHT}
      width={COMMENT_DELETE_BUTTON_WIDTH}
      size={COMMENT_DELETE_BUTTON_SIZE}
      padding={0}
    >
      <IoCloseCircleOutline />
    </IconButton>
  );
}

CommentDeleteButton.propTypes = {
  postID: PropTypes.string.isRequired,
  commentID: PropTypes.string.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
};

export default CommentDeleteButton;
