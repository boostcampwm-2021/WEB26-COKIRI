import Link from 'next/link';
import PropTypes from 'prop-types';

import ProfileImage from 'src/components/images/ProfileImage';

import { DEFAULT_PROFILE_IMAGE, DEFAULT_PROFILE_IMAGE_SIZE } from 'src/globals/constants';

import { Wrapper } from './style';

interface Props {
  username?: string;
  profileImage?: string;
  size?: number;
}

function ProfileImageButton({ username, profileImage, size }: Props) {
  return (
    <Wrapper>
      <Link href={`/users/${username}`} passHref>
        <a>
          <ProfileImage profileImage={profileImage!} size={size} />
        </a>
      </Link>
    </Wrapper>
  );
}

ProfileImageButton.propsType = {
  username: PropTypes.string,
  profileImage: PropTypes.string,
  size: PropTypes.number,
};

ProfileImageButton.defaultProps = {
  username: '',
  profileImage: DEFAULT_PROFILE_IMAGE,
  size: DEFAULT_PROFILE_IMAGE_SIZE,
};

export default ProfileImageButton;
