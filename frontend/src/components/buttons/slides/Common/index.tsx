import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

import { Button } from './style';

interface Props {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function SlideButton({ children, onClick }: Props) {
  return (
    <Button onClick={onClick}>
      <IconContext.Provider value={{ size: '28px' }}>{children}</IconContext.Provider>
    </Button>
  );
}

SlideButton.propsType = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SlideButton;
