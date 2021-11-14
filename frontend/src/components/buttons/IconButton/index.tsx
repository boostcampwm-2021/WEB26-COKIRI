import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

import Button from 'src/components/buttons/Common';

import { DEFAULT_BUTTON_PADDING, DEFAULT_ICON_SIZE } from 'src/globals/constants';

interface Props {
  children: ReactNode;
  padding?: number;
  plain?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function IconButton({ children, onClick, padding, plain }: Props) {
  return (
    <Button onClick={onClick} padding={padding} plain={plain}>
      <IconContext.Provider value={{ size: DEFAULT_ICON_SIZE }}>{children}</IconContext.Provider>
    </Button>
  );
}

IconButton.propsType = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.number,
  plain: PropTypes.bool,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  padding: DEFAULT_BUTTON_PADDING,
  plain: false,
  onClick: () => {},
};

export default IconButton;
