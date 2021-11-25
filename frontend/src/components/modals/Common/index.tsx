import { ReactNode } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Spacer } from 'src/components/Grid';
import ButtonCommon from 'src/components/buttons/Common';

import { DEFAULT_MODAL_WIDTH } from 'src/globals/constants';

import { Background, Card, Title } from './style';

interface Props {
  children: ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  close?: string;
  confirm?: string;
  width?: number;
  height?: number;
  disabled?: boolean;
  title?: string;
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
  title,
}: Props) {
  return (
    <>
      <Background onClick={onClose} />
      <Card width={width!} height={height!}>
        <Col alignItems='center' justifyContent='space-between' expanded>
          <Title>{title}</Title>
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
  title: PropTypes.string,
};

ModalCommon.defaultProps = {
  onClose: () => {},
  onConfirm: () => {},
  close: '',
  confirm: '',
  width: DEFAULT_MODAL_WIDTH,
  height: 0,
  disabled: false,
  title: '',
};

export default ModalCommon;
