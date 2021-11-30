import { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';

import ButtonCommon from 'src/components/buttons/Common';
import { Row, Col } from 'src/components/Grid';

import { DEFAULT_MODAL_WIDTH } from 'src/globals/constants';

import { Background, Card, Title } from './style';

interface Props {
  onClose?: VoidFunction;
  onConfirm?: VoidFunction;
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
}: PropsWithChildren<Props>) {
  return (
    <>
      <Background onClick={onClose} />
      <Card width={width!} height={height!}>
        <Col alignItems='center' justifyContent='space-between' expanded>
          <Title>{title}</Title>
          {children}
          <Row>
            {close && (
              <ButtonCommon title='modal-close' onClick={onClose}>
                {close}
              </ButtonCommon>
            )}
            {confirm && (
              <ButtonCommon onClick={onConfirm} disabled={disabled} title='modal-confirm'>
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
  children: PropTypes.node,
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
  children: null,
  onClose: () => {},
  onConfirm: () => {},
  close: undefined,
  confirm: undefined,
  width: DEFAULT_MODAL_WIDTH,
  height: 0,
  disabled: false,
  title: '',
};

export default ModalCommon;
