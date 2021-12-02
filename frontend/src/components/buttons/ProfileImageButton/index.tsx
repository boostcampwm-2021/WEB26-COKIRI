import Link from 'next/link';
import PropTypes from 'prop-types';

import ProfileImage from 'src/components/images/ProfileImage';

import { DEFAULT_PROFILE_IMAGE_SIZE } from 'src/globals/constants';
import { DEFAULT_PROFILE_IMAGE } from 'src/globals/images';

import { Wrapper } from './style';

interface Props {
  username: string;
  profileImage: string;
  size: number;
}

function ProfileImageButton({ username, profileImage, size }: Props) {
  return (
    <Wrapper size={size}>
      <Link href={`/users/${username}`} passHref>
        <a>
          <ProfileImage profileImage={profileImage} size={size} username={username} />
        </a>
      </Link>
    </Wrapper>
  );
}

ProfileImageButton.propTypes = {
  username: PropTypes.string.isRequired,
  profileImage: PropTypes.string,
  size: PropTypes.number,
};

ProfileImageButton.defaultProps = {
  profileImage: DEFAULT_PROFILE_IMAGE,
  size: DEFAULT_PROFILE_IMAGE_SIZE,
};

export default ProfileImageButton;
