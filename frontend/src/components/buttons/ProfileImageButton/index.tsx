import Link from 'next/link';
import PropTypes from 'prop-types';
import Image from 'next/image';

import { Wrapper } from './style';

interface Props {
  username: string;
  imageSrc: string;
}

function ProfileImageButton({ username, imageSrc }: Props) {
  return (
    <Wrapper>
      <Link href={`/users/${username}`}>
        <a href={`/users/${username}`}>
          <Image src={imageSrc} width='36' height='36' />
        </a>
      </Link>
    </Wrapper>
  );
}

ProfileImageButton.propsType = {
  href: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default ProfileImageButton;
