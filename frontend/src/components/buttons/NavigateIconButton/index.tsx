import { ReactNode } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import IconButton from 'src/components/buttons/IconButton';
import { DEFAULT_ICON_SIZE } from 'src/globals/constants';

interface Props {
  href: string;
  children: ReactNode;
  size?: number;
  plain?: boolean;
  clicked?: boolean;
}

function NavigateIconButton({ href, children, size, plain, clicked }: Props) {
  return (
    <IconButton padding={0} size={size} plain={plain} clicked={clicked!}>
      <Link href={href} passHref>
        <a>{children}</a>
      </Link>
    </IconButton>
  );
}

NavigateIconButton.propsType = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
  padding: PropTypes.number,
  plain: PropTypes.bool,
  clicked: PropTypes.bool,
};

NavigateIconButton.defaultProps = {
  size: DEFAULT_ICON_SIZE,
  plain: false,
  clicked: false,
};

export default NavigateIconButton;
