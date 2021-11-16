import React, { ReactNode, useMemo } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

import ButtonCommon from 'src/components/buttons/Common';

import {
  DEFAULT_BUTTON_PADDING,
  DEFAULT_ICON_SIZE,
  DEFAULT_BUTTON_MARGIN,
} from 'src/globals/constants';

interface Props {
  width?: number;
  height?: number;
  children: ReactNode;
  padding?: number;
  margin?: number;
  plain?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: number;
}

function IconButton({ children, onClick, padding, margin, plain, width, height, size }: Props) {
  const props = useMemo(() => ({ size: `${size}` }), [size]);
  return (
    <ButtonCommon
      onClick={onClick}
      padding={padding}
      plain={plain}
      width={width}
      height={height}
      margin={margin}
    >
      <IconContext.Provider value={props}>{children}</IconContext.Provider>
    </ButtonCommon>
  );
}

IconButton.propsType = {
  size: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node.isRequired,
  padding: PropTypes.number,
  margin: PropTypes.number,
  plain: PropTypes.bool,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  size: DEFAULT_ICON_SIZE,
  width: 0,
  height: 0,
  margin: DEFAULT_BUTTON_MARGIN,
  padding: DEFAULT_BUTTON_PADDING,
  plain: false,
  onClick: () => {},
};

export default IconButton;
