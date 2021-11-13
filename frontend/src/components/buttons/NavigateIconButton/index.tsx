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
    <IconButton>
      <Link href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
