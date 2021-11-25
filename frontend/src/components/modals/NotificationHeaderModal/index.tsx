import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

import HeaderModal from 'src/components/modals/HeaderModal';
import FollowSet from 'src/components/sets/FollowSet';
import { Row } from 'src/components/Grid';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import { Background } from './style';

interface Props {
  onClose: () => void;
}

function NotificationHeaderModal({ onClose }: Props) {
  const user = useRecoilValue(userAtom);
  const { data } = useQuery(['notifications', user._id], () => Fetcher.getUserNotifications(user));
  return (
    <>
      <Background onClick={onClose} />
      <HeaderModal right>
        {(data ?? []).map(({ _id }) => (
          <Row key={_id} justifyContent='space-between' alignItems='center'>
            test
            <FollowSet targetUserID={_id!} />
          </Row>
        ))}
      </HeaderModal>
    </>
  );
}

NotificationHeaderModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NotificationHeaderModal;
