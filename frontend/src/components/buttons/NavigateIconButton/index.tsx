import { PropsWithChildren } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import IconButton from 'src/components/buttons/IconButton';
import { DEFAULT_ICON_SIZE } from 'src/globals/constants';

interface Props {
  href: string;
  title: string;
  size: number;
  clicked: boolean;
  onClick: VoidFunction;
}

function NavigateIconButton({
  href,
  children,
  size,
  clicked,
  title,
  onClick,
}: PropsWithChildren<Props>) {
  return (
    <IconButton padding={0} size={size} clicked={clicked} title='navigate' onClick={onClick}>
      <Link href={href} passHref>
        <a aria-label={title}>{children}</a>
      </Link>
    </IconButton>
  );
}

NavigateIconButton.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
  clicked: PropTypes.bool,
  onClick: PropTypes.func,
};

NavigateIconButton.defaultProps = {
  size: DEFAULT_ICON_SIZE,
  clicked: false,
  onClick: () => {},
};

export default NavigateIconButton;
