import Link from 'next/link';
import PropTypes from 'prop-types';

import ProfileImage from 'src/components/ProfileImage';

import { DEFAULT_PROFILE_IMAGE } from 'src/globals/constants';

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
          <ProfileImage profileImage={profileImage!} />
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
