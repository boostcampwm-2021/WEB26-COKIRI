import Link from 'next/link';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

interface Props {
  username: string;
  marginRight?: number;
  width?: number;
}

function UsernameButton({ username, marginRight, width }: Props) {
  return (
    <Wrapper marginRight={marginRight!} width={width!}>
      <Link href={`/users/${username}`} passHref>
        <a>{username}</a>
      </Link>
    </Wrapper>
  );
}

UsernameButton.propTypes = {
  username: PropTypes.string.isRequired,
  marginRight: PropTypes.number,
  width: PropTypes.number,
};

UsernameButton.defaultProps = {
  marginRight: 0,
  width: 0,
};

export default UsernameButton;
