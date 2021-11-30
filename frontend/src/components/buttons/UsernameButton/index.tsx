import Link from 'next/link';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

interface Props {
  username: string;
  width: number;
}

function UsernameButton({ username, width }: Props) {
  return (
    <Wrapper width={width}>
      <Link href={`/users/${username}`} passHref>
        <a>{username}</a>
      </Link>
    </Wrapper>
  );
}

UsernameButton.propTypes = {
  username: PropTypes.string.isRequired,
  width: PropTypes.number,
};

UsernameButton.defaultProps = {
  width: 0,
};

export default UsernameButton;
