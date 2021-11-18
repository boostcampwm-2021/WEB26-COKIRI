import { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import DeleteCommon from 'src/components/buttons/deletes/Common';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import { CommentType } from 'src/types';

interface Props {
  postID: string;
  commentID: string;
  setComments: Dispatch<SetStateAction<CommentType[]>>;
}

function CommentDeleteButton({ postID, commentID, setComments }: Props) {
  const user = useRecoilValue(userAtom);

  const mutation = useMutation(() => Fetcher.deleteComment(user, postID, commentID), {
    onSuccess: () =>
      setComments((prevState: CommentType[]) =>
        [...prevState].filter((comment) => comment._id !== commentID),
      ),
  });
  return <DeleteCommon mutation={mutation} content='댓글' />;
}

CommentDeleteButton.propTypes = {
  postID: PropTypes.string.isRequired,
  commentID: PropTypes.string.isRequired,
  setComments: PropTypes.func.isRequired,
};

export default CommentDeleteButton;
