import { ReactNode } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Spacer } from 'src/components/Grid';
import ButtonCommon from 'src/components/buttons/Common';

import { DEAULT_MODAL_WIDTH } from 'src/globals/constants';

import { Background, Card } from './style';

interface Props {
  children: ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  close?: string;
  confirm?: string;
  width?: number;
  height?: number;
  disabled?: boolean;
}

function ModalCommon({
  children,
  onClose,
  onConfirm,
  close,
  confirm,
  height,
  width,
  disabled,
}: Props) {
  return (
    <>
      <Background onClick={onClose} />
      <Card width={width!} height={height!}>
        <Col alignItems='center'>
          {children}
          <Row>
            <Spacer />
            {close !== '' && <ButtonCommon onClick={onClose}>{close}</ButtonCommon>}
            {confirm !== '' && (
              <ButtonCommon onClick={onConfirm} disabled={disabled}>
                {confirm}
              </ButtonCommon>
            )}
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
  width: PropTypes.number,
  height: PropTypes.number,
  disabled: PropTypes.bool,
};

ModalCommon.defaultProps = {
  onClose: () => {},
  onConfirm: () => {},
  close: '',
  confirm: '',
  width: DEAULT_MODAL_WIDTH,
  height: 0,
  disabled: false,
};

export default ModalCommon;
