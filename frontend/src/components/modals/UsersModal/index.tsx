import PropTypes from 'prop-types';

import { Col, Row } from 'src/components/Grid';

import { UserType } from 'src/types';
import ModalCommon from 'src/components/modals/Common';
import ProfileSet from 'src/components/sets/ProfileSet';
import FollowSet from 'src/components/sets/FollowSet';

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
          <Row justifyContent='space-between' key={user.username}>
            <ProfileSet profileImage={user.profileImage} username={user.username!} />
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
