import { ReactNode } from 'react';
import PropTypes from 'prop-types';

import { IconContext } from 'react-icons';
import { Button } from './style';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

function Common({ children, onClick }: Props) {
  return (
    <Button onClick={onClick}>
      <IconContext.Provider value={{ size: '32' }}>{children}</IconContext.Provider>
    </Button>
  );
}

Common.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Common.defaultProps = {
  onClick: () => {},
};

export default Common;
