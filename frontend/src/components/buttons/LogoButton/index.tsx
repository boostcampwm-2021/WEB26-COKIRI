import { ReactNode } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

interface Props {
  href: string;
  children: ReactNode;
}

function LogoButton({ href, children }: Props) {
  return (
    <Wrapper>
      <Link href={href}>
        <a href={href}>{children}</a>
      </Link>
    </Wrapper>
  );
}

LogoButton.propsType = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default LogoButton;
