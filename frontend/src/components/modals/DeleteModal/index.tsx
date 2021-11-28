import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';

interface Props {
  onConfirm: () => void;
  onClose: () => void;
  title: string;
}

function DeleteModal({ onConfirm, onClose, title }: Props) {
  return (
    <ModalCommon
      confirm='삭제'
      close='취소'
      onConfirm={onConfirm}
      onClose={onClose}
      title={title}
    />
  );
}

DeleteModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default DeleteModal;
