import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import DeleteCommon from 'src/components/buttons/deletes/Common';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

interface Props {
  postID: string;
  onPostDelete: () => void;
}

function PostDeleteButton({ postID, onPostDelete }: Props) {
  const user = useRecoilValue(userAtom);
  const mutation = useMutation(() => Fetcher.deletePost(user, postID), {
    onSuccess: () => onPostDelete(),
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return <DeleteCommon onClick={handleClick} content='게시물' />;
}

PostDeleteButton.propTypes = {
  postID: PropTypes.string.isRequired,
  onPostDelete: PropTypes.func.isRequired,
};

export default PostDeleteButton;
