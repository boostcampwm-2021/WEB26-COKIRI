import { ReactNode } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Spacer } from 'src/components/Grid';

import { Background, Card, CloseButton, ConfirmButton } from './style';

interface Props {
  children: ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  close?: string;
  confirm?: string;
}

function Modal({ children, onClose, onConfirm, close, confirm }: Props) {
  return (
    <>
      <Background onClick={onClose} />
      <Card>
        <Col>
          {children}
          <Row>
            <Spacer />
            {close !== '' && <CloseButton onClick={onClose}>{close}</CloseButton>}
            {confirm !== '' && <ConfirmButton onClick={onConfirm}>{confirm}</ConfirmButton>}
          </Row>
        </Col>
      </Card>
    </>
  );
}

Modal.propTyps = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  close: PropTypes.string,
  confirm: PropTypes.string,
};

Modal.defaultProps = {
  onClose: () => {},
  onConfirm: () => {},
  close: '',
  confirm: '',
};

export default Modal;
