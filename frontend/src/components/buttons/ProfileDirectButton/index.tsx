import Link from 'next/link';
import PropTypes from 'prop-types';

interface Props {
  username: string;
}

function ProfileDirectButton({ username }: Props) {
  return (
    <Link href={`/users/${username}`} passHref>
      <a>내 프로필 바로가기</a>
    </Link>
  );
}

ProfileDirectButton.propsType = {
  username: PropTypes.string,
};

export default ProfileDirectButton;
