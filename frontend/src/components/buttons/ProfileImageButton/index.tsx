import Link from 'next/link';
import PropTypes from 'prop-types';

import ProfileImage from 'src/components/images/ProfileImage';

import { DEFAULT_PROFILE_IMAGE_SIZE } from 'src/globals/constants';
import { DEFAULT_PROFILE_IMAGE } from 'src/globals/images';

import { Wrapper } from './style';

interface Props {
  username: string;
  profileImage?: string;
  size?: number;
  marginRight?: number;
  marginTop?: number;
}

function ProfileImageButton({ username, profileImage, size, marginRight, marginTop }: Props) {
  return (
    <Wrapper marginRight={marginRight!} marginTop={marginTop!} size={size!}>
      <Link href={`/users/${username}`} passHref>
        <a>
          <ProfileImage profileImage={profileImage!} size={size} />
        </a>
      </Link>
    </Wrapper>
  );
}

ProfileImageButton.propsType = {
  username: PropTypes.string.isRequired,
  profileImage: PropTypes.string,
  size: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
};

ProfileImageButton.defaultProps = {
  profileImage: DEFAULT_PROFILE_IMAGE,
  size: DEFAULT_PROFILE_IMAGE_SIZE,
  marginRight: 0,
  marginTop: 0,
};

export default ProfileImageButton;
