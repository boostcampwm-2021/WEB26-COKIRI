import PropTypes from 'prop-types';

import { Col, Row } from 'src/components/Grid';

import ModalCommon from 'src/components/modals/Common';
import ProfileSet from 'src/components/sets/ProfileSet';
import FollowSet from 'src/components/sets/FollowSet';

import { UserType } from 'src/types';

interface Props {
  title: string;
  users: UserType[];
  onClose: () => void;
}

function UsersModal({ title, users, onClose }: Props) {
  return (
    <ModalCommon confirm='확인' onConfirm={onClose} onClose={onClose}>
      {title}
      <Col>
        {users?.map((user) => (
          <Row justifyContent='space-between' key={user._id}>
            <ProfileSet
              profileImage={user.profileImage}
              username={user.username!}
              onClick={onClose}
            />
            <FollowSet targetUserID={user._id!} />
          </Row>
        ))}
      </Col>
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
