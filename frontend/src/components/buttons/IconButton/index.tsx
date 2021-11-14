import React, { ReactNode, useMemo } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

import Button from 'src/components/buttons/Common';

import { DEFAULT_BUTTON_PADDING, DEFAULT_ICON_SIZE } from 'src/globals/constants';

interface Props {
  width?: number;
  height?: number;
  children: ReactNode;
  padding?: number;
  plain?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: number;
}

function IconButton({ children, onClick, padding, plain, width, height, size }: Props) {
  const props = useMemo(() => ({ size: `${size}` }), [size]);
  return (
    <Button onClick={onClick} padding={padding} plain={plain} width={width} height={height}>
      <IconContext.Provider value={props}>{children}</IconContext.Provider>
    </Button>
  );
}

IconButton.propsType = {
  size: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node.isRequired,
  padding: PropTypes.number,
  plain: PropTypes.bool,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  size: DEFAULT_ICON_SIZE,
  width: 0,
  height: 0,
  padding: DEFAULT_BUTTON_PADDING,
  plain: false,
  onClick: () => {},
};

export default IconButton;
