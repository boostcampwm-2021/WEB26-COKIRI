import Link from 'next/link';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

interface Props {
  href: string;
  userName: string;
}

function ProfileUsernameButton({ href, userName }: Props) {
  return (
    <Wrapper>
      <Link href={href}>
        <a href={href}>{userName}</a>
      </Link>
    </Wrapper>
  );
}

ProfileUsernameButton.propsType = {
  href: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default ProfileUsernameButton;
