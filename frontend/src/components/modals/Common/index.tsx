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
  height?: number;
}

function ModalCommon({ children, onClose, onConfirm, close, confirm, height }: Props) {
  return (
    <>
      <Background onClick={onClose} />
      <Card height={height!}>
        <Col alignItems='center'>
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

ModalCommon.propTyps = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  close: PropTypes.string,
  confirm: PropTypes.string,
  height: PropTypes.number,
};

ModalCommon.defaultProps = {
  onClose: () => {},
  onConfirm: () => {},
  close: '',
  confirm: '',
  height: 0,
};

export default ModalCommon;
