import { PropsWithChildren } from 'react';

import PropTypes from 'prop-types';
import { Wrapper } from './style';

interface Props {
  right?: boolean;
  width?: number;
}

function HeaderModal({ children, right, width }: PropsWithChildren<Props>) {
  return (
    <Wrapper right={right!} width={width!}>
      {children}
    </Wrapper>
  );
}

HeaderModal.propTyps = {
  children: PropTypes.node.isRequired,
  right: PropTypes.bool,
  left: PropTypes.bool,
  width: PropTypes.number,
};

HeaderModal.defaultProps = {
  right: false,
  width: 400,
};

export default HeaderModal;
