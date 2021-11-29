import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import UsersModal from 'src/components/modals/UsersModal';

import { Fetcher } from 'src/utils';

interface Props {
  targetUserID: string;
  onClose: VoidFunction;
}

function FollowsModal({ targetUserID, onClose }: Props) {
  const { data } = useQuery(['user', 'follows', targetUserID], () =>
    Fetcher.getUserFollows(targetUserID),
  );

  return <UsersModal users={data ?? []} onClose={onClose} title='팔로우' />;
}

FollowsModal.propTypes = {
  targetUserID: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FollowsModal;
