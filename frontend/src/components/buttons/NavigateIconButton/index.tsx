import { ReactNode } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import IconButton from 'src/components/buttons/IconButton';

interface Props {
  href: string;
  children: ReactNode;
}

function NavigateIconButton({ href, children }: Props) {
  return (
    <IconButton padding={0}>
      <Link href={href} passHref>
        <a>{children}</a>
      </Link>
    </IconButton>
  );
}

NavigateIconButton.propsType = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavigateIconButton;
