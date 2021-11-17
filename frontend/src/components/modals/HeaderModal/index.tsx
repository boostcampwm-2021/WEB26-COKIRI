import { ReactNode } from 'react';

import PropTypes from 'prop-types';
import { Wrapper } from './style';

interface Props {
  children: ReactNode;
  right?: boolean;
  left?: boolean;
}

function HeaderModal({ children, left, right }: Props) {
  return (
    <Wrapper left={left!} right={right!}>
      {children}
    </Wrapper>
  );
}

HeaderModal.propTyps = {
  children: PropTypes.node.isRequired,
  right: PropTypes.bool,
  left: PropTypes.bool,
};

HeaderModal.defaultProps = {
  right: false,
  left: true,
};

export default HeaderModal;
