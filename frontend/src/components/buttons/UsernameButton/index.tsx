import Link from 'next/link';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

interface Props {
  username: string;
}

function UsernameButton({ username }: Props) {
  return (
    <Wrapper>
      <Link href={`/users/${username}`} passHref>
        <a>{username}</a>
      </Link>
    </Wrapper>
  );
}

UsernameButton.propsType = {
  username: PropTypes.string.isRequired,
};

export default UsernameButton;
