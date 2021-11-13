import Link from 'next/link';
import PropTypes from 'prop-types';
import Image from 'next/image';

import { POST_PROFILE_IMAGE_HEIGHT, POST_PROFILE_IMAGE_WIDTH } from 'src/globals/constants';

import { Wrapper } from './style';

interface Props {
  username?: string;
  image: string;
}

function ProfileImageButton({ username, image }: Props) {
  return (
    <Wrapper>
      <Link href={`/users/${username}`}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <Image src={image} width={POST_PROFILE_IMAGE_WIDTH} height={POST_PROFILE_IMAGE_HEIGHT} />
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
