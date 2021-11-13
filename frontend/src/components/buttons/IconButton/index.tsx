import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

import Button from 'src/components/buttons/Common';

import { DEFAULT_ICON_SIZE } from 'src/globals/constants';

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

function IconButton({ children, onClick }: Props) {
  return (
    <Button onClick={onClick}>
      <IconContext.Provider value={{ size: DEFAULT_ICON_SIZE }}>{children}</IconContext.Provider>
    </Button>
  );
}

IconButton.propsType = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  onClick: () => {},
};

export default IconButton;
