import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import DeleteCommon from 'src/components/buttons/deletes/Common';

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
  return <DeleteCommon onClick={handleClick} content='댓글' />;
}

CommentDeleteButton.propTypes = {
  postID: PropTypes.string.isRequired,
  commentID: PropTypes.string.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
};

export default CommentDeleteButton;
