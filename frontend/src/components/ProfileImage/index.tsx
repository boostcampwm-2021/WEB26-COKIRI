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
  isButton?: boolean;
}

function ProfileImage({ username, profileImage, isButton }: Props) {
  return (
    <Wrapper>
      {isButton ? (
        <Link href={`/users/${username}`} passHref>
          <a>
            <Image
              src={profileImage!}
              width={POST_PROFILE_IMAGE_WIDTH}
              height={POST_PROFILE_IMAGE_HEIGHT}
            />
          </a>
        </Link>
      ) : (
        <Image
          src={profileImage!}
          width={POST_PROFILE_IMAGE_WIDTH}
          height={POST_PROFILE_IMAGE_HEIGHT}
        />
      )}
    </Wrapper>
  );
}

ProfileImage.propsType = {
  username: PropTypes.string,
  profileImage: PropTypes.string,
  isButton: PropTypes.bool,
};

ProfileImage.defaultProps = {
  username: '',
  profileImage: DEFAULT_PROFILE_IMAGE,
  isButton: false,
};

export default ProfileImage;
