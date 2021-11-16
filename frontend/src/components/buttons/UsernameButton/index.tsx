import Link from 'next/link';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

interface Props {
  username: string;
  marginRight?: number;
}

function UsernameButton({ username, marginRight }: Props) {
  return (
    <Wrapper marginRight={marginRight!}>
      <Link href={`/users/${username}`} passHref>
        <a>{username}</a>
      </Link>
    </Wrapper>
  );
}

UsernameButton.propsType = {
  username: PropTypes.string.isRequired,
  marginRight: PropTypes.number,
};

UsernameButton.defaultProps = {
  marginRight: 0,
};

export default UsernameButton;
