import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

import { Button } from './style';

interface Props {
  children: ReactNode;
}

function LikeButton({ children }: Props) {
  return (
    <Button>
      <IconContext.Provider value={{ size: '24px' }}>{children}</IconContext.Provider>
    </Button>
  );
}

LikeButton.propsType = {
  children: PropTypes.node.isRequired,
};

export default LikeButton;
