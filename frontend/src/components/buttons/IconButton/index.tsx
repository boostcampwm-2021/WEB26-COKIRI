import React, { PropsWithChildren, useMemo } from 'react';
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
  padding?: number;
  margin?: number;
  plain?: boolean;
  size?: number;
  hidden?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  clicked?: boolean;
  disabled?: boolean;
}

function IconButton({
  children,
  onClick,
  padding,
  margin,
  plain,
  hidden,
  width,
  height,
  size,
  clicked,
  disabled,
}: PropsWithChildren<Props>) {
  const props = useMemo(() => ({ size: `${size}` }), [size]);
  return (
    <ButtonCommon
      onClick={onClick}
      padding={padding}
      plain={plain}
      width={width}
      height={height}
      margin={margin}
      hidden={hidden}
      clicked={clicked}
      disabled={disabled}
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
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
  clicked: PropTypes.bool,
  disabled: PropTypes.bool,
};

IconButton.defaultProps = {
  size: DEFAULT_ICON_SIZE,
  width: 0,
  height: 0,
  margin: DEFAULT_BUTTON_MARGIN,
  padding: DEFAULT_BUTTON_PADDING,
  plain: false,
  hidden: false,
  onClick: () => {},
  clicked: false,
  disabled: false,
};

export default IconButton;
