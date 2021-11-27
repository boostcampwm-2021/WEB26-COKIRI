import PropTypes from 'prop-types';

import { Row } from 'src/components/Grid';

import ModalCommon from 'src/components/modals/Common';
import ProfileSet from 'src/components/sets/ProfileSet';
import FollowSet from 'src/components/sets/FollowSet';

import { UserType } from 'src/types';

import { Users, User } from './style';

interface Props {
  title: string;
  users: UserType[];
  onClose: () => void;
}

function UsersModal({ title, users, onClose }: Props) {
  return (
    <ModalCommon confirm='확인' onConfirm={onClose} onClose={onClose} title={title}>
      <Users>
        {users?.map((user) => (
          <User key={user._id}>
            <Row justifyContent='space-between' alignItems='center'>
              <ProfileSet
                profileImage={user.profileImage}
                username={user.username!}
                onClick={onClose}
              />
              <FollowSet targetUserID={user._id!} />
            </Row>
          </User>
        ))}
      </Users>
    </ModalCommon>
  );
}

UsersModal.propTypes = {
  title: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func,
};

UsersModal.defaultProps = {
  onClose: () => {},
};

export default UsersModal;
