import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

import Button from 'src/components/buttons/Common';

import { DEFAULT_ICON_SIZE } from 'src/globals/constants';

interface Props {
  children: ReactNode;
}

function IconButton({ children }: Props) {
  return (
    <Button>
      <IconContext.Provider value={{ size: DEFAULT_ICON_SIZE }}>{children}</IconContext.Provider>
    </Button>
  );
}

IconButton.propsType = {
  children: PropTypes.node.isRequired,
};

export default IconButton;
