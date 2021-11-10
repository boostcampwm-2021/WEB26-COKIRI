import PropTypes from 'prop-types';

import Modal from 'src/components/modals/Common';
import Profile from 'src/components/Profile';
import { Row, Col } from 'src/components/Grid';
import FollowButton from 'src/components/buttons/FollowButton';

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
            <Profile href='users/123' imageSrc='/images/logo.svg' userName='tiger' />
            <FollowButton />
          </Row>
          <Row justifyContent='space-between'>
            <Profile href='users/123' imageSrc='/images/logo.svg' userName='tiger' />
            <FollowButton />
          </Row>
          <Row justifyContent='space-between'>
            <Profile href='users/123' imageSrc='/images/logo.svg' userName='tiger' />
            <FollowButton />
          </Row>
          <Row justifyContent='space-between'>
            <Profile href='users/123' imageSrc='/images/logo.svg' userName='tiger' />
            <FollowButton />
          </Row>
          <Row justifyContent='space-between'>
            <Profile href='users/123' imageSrc='/images/logo.svg' userName='tiger' />
            <FollowButton />
          </Row>
          <Row justifyContent='space-between'>
            <Profile href='users/123' imageSrc='/images/logo.svg' userName='tiger' />
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
