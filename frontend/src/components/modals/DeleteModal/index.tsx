import { ReactNode } from 'react';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';

interface Props {
  onConfirm: () => void;
  onClose: () => void;
  children: ReactNode;
}

function PostDeleteModal({ onConfirm, onClose, children }: Props) {
  return (
    <ModalCommon confirm='삭제' close='취소' onConfirm={onConfirm} onClose={onClose}>
      {children}
    </ModalCommon>
  );
}

PostDeleteModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default PostDeleteModal;
