import { ReactNode } from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_BUTTON_MARGIN, DEFAULT_BUTTON_PADDING } from 'src/globals/constants';

import { Button } from './style';

interface Props {
  width?: number;
  height?: number;
  margin?: number;
  padding?: number;
  children: ReactNode;
  onClick?: () => void;
}

function Common({ children, width, margin, padding, height, onClick }: Props) {
  return (
    <Button width={width} height={height} margin={margin} padding={padding} onClick={onClick}>
      {children}
    </Button>
  );
}

Common.propsType = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number,
  padding: PropTypes.number,
  onClick: PropTypes.func,
};

Common.defaultProps = {
  width: 0,
  height: 0,
  margin: DEFAULT_BUTTON_MARGIN,
  padding: DEFAULT_BUTTON_PADDING,
  onClick: () => {},
};

export default Common;
