import { PropsWithChildren } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import IconButton from 'src/components/buttons/IconButton';
import { DEFAULT_ICON_SIZE } from 'src/globals/constants';

interface Props {
  href: string;
  title: string;
  size: number;
  plain: boolean;
  clicked: boolean;
}

function NavigateIconButton({
  href,
  children,
  size,
  plain,
  clicked,
  title,
}: PropsWithChildren<Props>) {
  return (
    <IconButton padding={0} size={size} plain={plain} clicked={clicked!} title='navigate'>
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
  plain: PropTypes.bool,
  clicked: PropTypes.bool,
};

NavigateIconButton.defaultProps = {
  size: DEFAULT_ICON_SIZE,
  plain: false,
  clicked: false,
};

export default NavigateIconButton;
