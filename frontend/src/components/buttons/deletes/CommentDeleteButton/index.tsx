import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import { IoCloseCircleOutline } from 'react-icons/io5';

import IconButton from 'src/components/buttons/IconButton';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

interface Props {
  postID: string;
  commentID: string;
  // eslint-disable-next-line no-unused-vars
  onCommentDelete: (commentID: string) => void;
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
      height={36}
      width={36}
      size={20}
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
