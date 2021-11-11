import { ReactNode } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

import { Wrapper } from './style';

interface Props {
  children: ReactNode;
  href: string;
}

function CommentButton({ children, href }: Props) {
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

CommentButton.propsType = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default CommentButton;
