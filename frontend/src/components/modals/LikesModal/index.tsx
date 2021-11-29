import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import UsersModal from 'src/components/modals/UsersModal';

interface Props {
  postID: string;
  onClose: VoidFunction;
}

function LikesModal({ postID, onClose }: Props) {
  const user = useRecoilValue(userAtom);
  const { data: likes } = useQuery(['posts', 'likes', postID], () =>
    Fetcher.getPostLikes(user, postID),
  );
  const users = (likes ?? []).map((like) => like.user);

  return <UsersModal users={users ?? []} onClose={onClose} title='좋아하는 사람' />;
}

LikesModal.propTypes = {
  postID: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

LikesModal.defaultProps = {
  onClose: () => {},
};
export default LikesModal;
