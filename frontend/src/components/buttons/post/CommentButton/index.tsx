import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

import { Wrapper } from './style';

interface Props {
  children: ReactNode;
}

function CommentButton({ children }: Props) {
  return (
    <Wrapper>
      <button type='button'>
        <IconContext.Provider value={{ size: '24px' }}>{children}</IconContext.Provider>
      </button>
    </Wrapper>
  );
}

CommentButton.propsType = {
  children: PropTypes.node.isRequired,
};

export default CommentButton;
