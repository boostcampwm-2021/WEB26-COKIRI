import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import DeleteCommon from 'src/components/buttons/deletes/Common';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

interface Props {
  postID: string;
}

function PostDeleteButton({ postID }: Props) {
  const user = useRecoilValue(userAtom);
  const mutation = useMutation(() => Fetcher.deletePost(user, postID));
  return <DeleteCommon mutation={mutation} content='게시물' />;
}

PostDeleteButton.propTypes = {
  postID: PropTypes.string.isRequired,
};

export default PostDeleteButton;
