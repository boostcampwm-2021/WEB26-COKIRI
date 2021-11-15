import PropTypes from 'prop-types';

import ProfileImage from 'src/components/ProfileImage';
import UsernameButton from 'src/components/buttons/UsernameButton';

import { DEFAULT_PROFILE_IMAGE } from 'src/globals/constants';

import { Wrapper } from './style';

interface Props {
  profileImage?: string;
  username?: string;
}

function ProfileSet({ profileImage, username }: Props) {
  return (
    <Wrapper>
      <ProfileImage profileImage={profileImage!} username={username} isButton />
      <UsernameButton username={username!} />
    </Wrapper>
  );
}

ProfileSet.propTypes = {
  profileImage: PropTypes.string,
  username: PropTypes.string,
};

ProfileSet.defaultProps = {
  profileImage: DEFAULT_PROFILE_IMAGE,
  username: '',
};

export default ProfileSet;
