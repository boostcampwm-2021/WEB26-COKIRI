import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

import { Button } from './style';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

function Social({ children, onClick }: Props) {
  return (
    <Button onClick={onClick}>
      <IconContext.Provider value={{ size: '32' }}>{children}</IconContext.Provider>
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
