import PropTypes from 'prop-types';

import Google from 'src/components/buttons/socials/Google';
import Github from 'src/components/buttons/socials/Github';
import Kakao from 'src/components/buttons/socials/Kakao';
import ModalCommon from 'src/components/modals/Common';
import { Row } from 'src/components/Grid';

interface Props {
  onClose: () => void;
}

function SigninModal({ onClose }: Props) {
  return (
    <ModalCommon close='취소' onClose={onClose}>
      <Row justifyContent='center'>
        <Google />
        <Github />
        <Kakao />
      </Row>
    </ModalCommon>
  );
}

SigninModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SigninModal;
