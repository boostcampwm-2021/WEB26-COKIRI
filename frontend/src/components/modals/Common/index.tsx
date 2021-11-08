import { ReactNode } from 'react';
import PropTypes from 'prop-types';

interface Props {
  children: ReactNode;
}

function Modal({ children }: Props) {
  return <>{children}</>;
}

Modal.propTyps = {
  children: PropTypes.node.isRequired,
};

export default Modal;
