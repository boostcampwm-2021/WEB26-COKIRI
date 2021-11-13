import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

import Button from 'src/components/buttons/Common';

import {
  SOCIAL_BUTTON_WIDTH,
  SOCIAL_BUTTON_HEIGHT,
  SOCIAL_BUTTON_MARGIN,
  SOCIAL_ICON_SIZE,
} from 'src/globals/constants';

interface Props {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function Social({ children, onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      width={SOCIAL_BUTTON_WIDTH}
      height={SOCIAL_BUTTON_HEIGHT}
      margin={SOCIAL_BUTTON_MARGIN}
    >
      <IconContext.Provider value={{ size: SOCIAL_ICON_SIZE }}>{children}</IconContext.Provider>
    </Button>
  );
}

Social.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Social.defaultProps = {
  onClick: () => {},
};

export default Social;
