import Link from 'next/link';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

interface Props {
  username?: string;
}

function ProfileUsernameButton({ username }: Props) {
  return (
    <Wrapper>
      <Link href={`/users/${username}`}>
        <a href={`/users/${username}`}>{username}</a>
      </Link>
    </Wrapper>
  );
}

ProfileUsernameButton.propsType = {
  username: PropTypes.string,
};

ProfileUsernameButton.defaultProps = {
  username: '',
};

export default ProfileUsernameButton;
