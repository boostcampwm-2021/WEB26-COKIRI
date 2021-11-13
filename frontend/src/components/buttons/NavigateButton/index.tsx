import { ReactNode } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

import Button from 'src/components/buttons/Common';

import { HEADER_ICON_SIZE } from 'src/globals/constants';

interface Props {
  href: string;
  children: ReactNode;
}

function NavigateButton({ href, children }: Props) {
  return (
    <Button>
      <Link href={href}>
        <a href={href}>
          <IconContext.Provider value={{ size: HEADER_ICON_SIZE }}>{children}</IconContext.Provider>
        </a>
      </Link>
    </Button>
  );
}

NavigateButton.propsType = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavigateButton;
