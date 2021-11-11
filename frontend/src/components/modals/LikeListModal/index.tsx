import PropTypes from 'prop-types';

import Modal from 'src/components/modals/Common';
import ProfileSet from 'src/components/ProfileSet';
import FollowButton from 'src/components/buttons/FollowButton';
import { Row, Col } from 'src/components/Grid';

import { Wrapper, Title } from './style';

interface Props {
  onClose: () => void;
}

function LikeListModal({ onClose }: Props) {
  return (
    <Wrapper>
      <Modal onClose={onClose} close='닫기'>
        <Title>좋아요</Title>
        <Col>
          <Row justifyContent='space-between'>
            <ProfileSet image='/images/logo.svg' username='tiger' />
            <FollowButton />
          </Row>
          <Row justifyContent='space-between'>
            <ProfileSet image='/images/logo.svg' username='tiger' />
            <FollowButton />
          </Row>
          <Row justifyContent='space-between'>
            <ProfileSet image='/images/logo.svg' username='tiger' />
            <FollowButton />
          </Row>
          <Row justifyContent='space-between'>
            <ProfileSet image='/images/logo.svg' username='tiger' />
            <FollowButton />
          </Row>
          <Row justifyContent='space-between'>
            <ProfileSet image='/images/logo.svg' username='tiger' />
            <FollowButton />
          </Row>
          <Row justifyContent='space-between'>
            <ProfileSet image='/images/logo.svg' username='tiger' />
            <FollowButton />
          </Row>
        </Col>
      </Modal>
    </Wrapper>
  );
}

LikeListModal.propTypes = {
  onClose: PropTypes.func,
};

LikeListModal.defaultProps = {
  onClose: () => {},
};
export default LikeListModal;
