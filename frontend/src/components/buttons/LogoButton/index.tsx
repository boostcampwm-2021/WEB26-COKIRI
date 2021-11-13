import { ReactNode } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Button from 'src/components/buttons/Common';

import { LOGO_BUTTON_WIDTH, LOGO_BUTTON_HEIGHT } from 'src/globals/constants';

interface Props {
  href: string;
  children: ReactNode;
}

function LogoButton({ href, children }: Props) {
  return (
    <Button width={LOGO_BUTTON_WIDTH} height={LOGO_BUTTON_HEIGHT}>
      <Link href={href}>
        <a href={href}>{children}</a>
      </Link>
    </Button>
  );
}

LogoButton.propsType = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default LogoButton;
