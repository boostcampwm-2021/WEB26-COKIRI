import React, { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_BUTTON_MARGIN, DEFAULT_BUTTON_PADDING } from 'src/globals/constants';

import { Button } from './style';

interface Props {
  width?: number;
  height?: number;
  margin?: number;
  padding?: number;
  plain?: boolean;
  hidden?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  clicked?: boolean;
  disabled?: boolean;
  red?: boolean;
  green?: boolean;
}

function ButtonCommon({
  children,
  width,
  margin,
  padding,
  height,
  onClick,
  plain,
  hidden,
  clicked,
  disabled,
  red,
  green,
}: PropsWithChildren<Props>) {
  return (
    <Button
      width={width!}
      height={height!}
      margin={margin!}
      padding={padding!}
      onClick={onClick!}
      plain={plain!}
      hidden={hidden!}
      clicked={clicked!}
      disabled={disabled!}
      red={red!}
      green={green!}
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
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
  clicked: PropTypes.bool,
  disabled: PropTypes.bool,
  green: PropTypes.bool,
  red: PropTypes.bool,
};

ButtonCommon.defaultProps = {
  width: 0,
  height: 0,
  margin: DEFAULT_BUTTON_MARGIN,
  padding: DEFAULT_BUTTON_PADDING,
  hidden: false,
  plain: false,
  onClick: () => {},
  clicked: false,
  disabled: false,
  green: false,
  red: false,
};

export default ButtonCommon;
