import { ReactNode } from 'react';
import PropTypes from 'prop-types';

import {
  DEFAULT_BUTTON_WIDTH,
  DEFAULT_BUTTON_HEIGHT,
  DEFAULT_BUTTON_MARGIN,
} from 'src/globals/constants';

import { Button } from './style';

interface Props {
  width?: number;
  height?: number;
  margin?: number;
  children: ReactNode;
  onClick?: () => void;
}

function Common({ children, width, margin, height, onClick }: Props) {
  return (
    <Button width={width} height={height} margin={margin} onClick={onClick}>
      {children}
    </Button>
  );
}

Common.propsType = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number,
  onClick: PropTypes.func,
};

Common.defaultProps = {
  width: DEFAULT_BUTTON_WIDTH,
  height: DEFAULT_BUTTON_HEIGHT,
  margin: DEFAULT_BUTTON_MARGIN,
  onClick: () => {},
};

export default Common;
