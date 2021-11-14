import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_BUTTON_MARGIN, DEFAULT_BUTTON_PADDING } from 'src/globals/constants';

import { Button } from './style';

interface Props {
  width?: number;
  height?: number;
  margin?: number;
  padding?: number;
  plain?: boolean;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function ButtonCommon({ children, width, margin, padding, height, onClick, plain }: Props) {
  return (
    <Button
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      onClick={onClick}
      plain={plain}
    >
      {children}
    </Button>
  );
}

ButtonCommon.propsType = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number,
  padding: PropTypes.number,
  plain: PropTypes.bool,
  onClick: PropTypes.func,
};

ButtonCommon.defaultProps = {
  width: 0,
  height: 0,
  margin: DEFAULT_BUTTON_MARGIN,
  padding: DEFAULT_BUTTON_PADDING,
  plain: false,
  onClick: () => {},
};

export default ButtonCommon;
