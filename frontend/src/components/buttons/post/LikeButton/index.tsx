import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

import { Wrapper } from './style';

interface Props {
  children: ReactNode;
}

function LikeButton({ children }: Props) {
  return (
    <Wrapper>
      <button type='button'>
        <IconContext.Provider value={{ size: '24px' }}>{children}</IconContext.Provider>
      </button>
    </Wrapper>
  );
}

LikeButton.propsType = {
  children: PropTypes.node.isRequired,
};

export default LikeButton;
