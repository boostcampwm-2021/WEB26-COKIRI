import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import UsersModal from 'src/components/modals/UsersModal';

import { Fetcher } from 'src/utils';

interface Props {
  targetUserID: string;
  onClose: VoidFunction;
}

function FollowersModal({ targetUserID, onClose }: Props) {
  const { data } = useQuery(['user', 'followers', targetUserID], () =>
    Fetcher.getUserFollowers(targetUserID),
  );

  return <UsersModal users={data ?? []} onClose={onClose} title='팔로워' />;
}

FollowersModal.propTypes = {
  targetUserID: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FollowersModal;
