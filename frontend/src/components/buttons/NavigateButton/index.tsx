import Link from 'next/link';
import { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

interface Props {
  title: string;
  href: string;
  onClick: VoidFunction;
}

function NavigateButton({ href, children, title, onClick }: PropsWithChildren<Props>) {
  return (
    <Wrapper onClick={onClick}>
      <Link href={href} passHref>
        <a aria-label={title}>{children}</a>
      </Link>
    </Wrapper>
  );
}

NavigateButton.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

NavigateButton.defaultProps = {
  onClick: () => {},
};

export default NavigateButton;
