import Link from 'next/link';
import PropTypes from 'prop-types';
import Image from 'next/image';

import {
  DEFAULT_PROFILE_IMAGE,
  POST_PROFILE_IMAGE_HEIGHT,
  POST_PROFILE_IMAGE_WIDTH,
} from 'src/globals/constants';

import { Wrapper } from './style';

interface Props {
  username?: string;
  profileImage?: string;
}

function ProfileImageButton({ username, profileImage }: Props) {
  return (
    <Wrapper>
      <Link href={`/users/${username}`} passHref>
        <a>
          <Image
            src={profileImage!}
            width={POST_PROFILE_IMAGE_WIDTH}
            height={POST_PROFILE_IMAGE_HEIGHT}
          />
        </a>
      </Link>
    </Wrapper>
  );
}

ProfileImageButton.propsType = {
  username: PropTypes.string,
  profileImage: PropTypes.string,
};

ProfileImageButton.defaultProps = {
  username: '',
  profileImage: DEFAULT_PROFILE_IMAGE,
};

export default ProfileImageButton;
