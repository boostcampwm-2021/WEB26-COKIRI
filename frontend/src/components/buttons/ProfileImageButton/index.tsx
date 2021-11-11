import Link from 'next/link';
import PropTypes from 'prop-types';
import Image from 'next/image';

import { Wrapper } from './style';

interface Props {
  username?: string;
  image: string;
}

function ProfileImageButton({ username, image }: Props) {
  return (
    <Wrapper>
      <Link href={`/users/${username}`}>
        <a href={`/users/${username}`}>
          <Image src={image} width='36' height='36' />
        </a>
      </Link>
    </Wrapper>
  );
}

ProfileImageButton.propsType = {
  username: PropTypes.string,
  image: PropTypes.string.isRequired,
};

ProfileImageButton.defaultProps = {
  username: '',
};

export default ProfileImageButton;
