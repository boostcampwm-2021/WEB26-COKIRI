import Link from 'next/link';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

interface Props {
  href: string;
  userName: string;
}

function ProfileUserNameButton({ href, userName }: Props) {
  return (
    <Wrapper>
      <Link href={href}>
        <a href={href}>{userName}</a>
      </Link>
    </Wrapper>
  );
}

ProfileUserNameButton.propsType = {
  href: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default ProfileUserNameButton;
