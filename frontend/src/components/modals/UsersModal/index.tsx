import PropTypes from 'prop-types';

import { Row } from 'src/components/Grid';

import ModalCommon from 'src/components/modals/Common';
import ProfileButton from 'src/components/buttons/ProfileButton';
import FollowSetButton from 'src/components/buttons/FollowSetButton';

import { UserType } from 'src/types';

import { Users, User } from './style';

interface Props {
  title: string;
  users: UserType[];
  onClose: VoidFunction;
}

function UsersModal({ title, users, onClose }: Props) {
  return (
    <ModalCommon confirm='확인' onConfirm={onClose} onClose={onClose} title={title}>
      <Users>
        {users?.map((user) => (
          <User key={user._id}>
            <Row justifyContent='space-between' alignItems='center'>
              <ProfileButton
                profileImage={user.profileImage}
                username={user.username!}
                onClick={onClose}
              />
              <FollowSetButton targetUserID={user._id!} />
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
