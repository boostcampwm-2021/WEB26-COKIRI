import { ReactNode } from 'react';

import PropTypes from 'prop-types';
import { Wrapper } from './style';

interface Props {
  children: ReactNode;
  right?: boolean;
}

function HeaderModal({ children, right }: Props) {
  return <Wrapper right={right!}>{children}</Wrapper>;
}

HeaderModal.propTyps = {
  children: PropTypes.node.isRequired,
  right: PropTypes.bool,
  left: PropTypes.bool,
};

HeaderModal.defaultProps = {
  right: false,
};

export default HeaderModal;
