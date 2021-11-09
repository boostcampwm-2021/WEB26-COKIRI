import { ReactNode } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

import { Wrapper } from './style';

interface Props {
  href: string;
  children: ReactNode;
}

function EchoButton({ href, children }: Props) {
  return (
    <Wrapper>
      <Link href={href}>
        <a href={href}>
          <IconContext.Provider value={{ size: '24px' }}>{children}</IconContext.Provider>
        </a>
      </Link>
    </Wrapper>
  );
}

EchoButton.propsType = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default EchoButton;
