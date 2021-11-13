import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

import Button from 'src/components/buttons/Common';

import { DEFAULT_BUTTON_PADDING, DEFAULT_ICON_SIZE } from 'src/globals/constants';

interface Props {
  children: ReactNode;
  padding?: number;
  onClick?: () => void;
}

function IconButton({ children, onClick, padding }: Props) {
  return (
    <Button onClick={onClick} padding={padding}>
      <IconContext.Provider value={{ size: DEFAULT_ICON_SIZE }}>{children}</IconContext.Provider>
    </Button>
  );
}

IconButton.propsType = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.number,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  padding: DEFAULT_BUTTON_PADDING,
  onClick: () => {},
};

export default IconButton;
