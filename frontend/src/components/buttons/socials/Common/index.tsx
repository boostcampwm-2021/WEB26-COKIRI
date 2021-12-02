import React, { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';

import IconButton from 'src/components/buttons/IconButton';

import { SOCIAL_BUTTON_WIDTH, SOCIAL_BUTTON_HEIGHT, SOCIAL_ICON_SIZE } from 'src/globals/constants';

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function SocialCommon({ children, onClick }: PropsWithChildren<Props>) {
  return (
    <IconButton
      onClick={onClick}
      width={SOCIAL_BUTTON_WIDTH}
      height={SOCIAL_BUTTON_HEIGHT}
      size={SOCIAL_ICON_SIZE}
      title='social'
    >
      {children}
    </IconButton>
  );
}

SocialCommon.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

SocialCommon.defaultProps = {
  onClick: () => {},
};

export default SocialCommon;
