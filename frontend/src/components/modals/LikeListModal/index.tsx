import Image from 'next-images';
import PropTypes from 'prop-types';
import Modal from 'src/components/modals/Common';
import { Col } from 'src/components/Grid';

interface Props {
  onClose: () => void;
}

function LikeListModal({ onClose }: Props) {
  return (
    <Modal onClose={onClose} onConfirm={() => {}} close='닫기' confirm='확인'>
      <div>
        <Image src='/images/logo.svg' width='20' height='20' />
        <p>타이거</p>
      </div>
    </Modal>
  );
}

LikeListModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default LikeListModal;
