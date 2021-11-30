import PropTypes from 'prop-types';

import ProfileImage from 'src/components/images/ProfileImage';
import NavigateButton from 'src/components/buttons/NavigateButton';

import { DEFAULT_PROFILE_IMAGE } from 'src/globals/images';

import { Username } from './style';

interface Props {
  profileImage: string;
  username: string;
  onClick: VoidFunction;
}

function ProfileSet({ profileImage, username, onClick }: Props) {
  return (
    <NavigateButton href={`/users/${username}`} title={username} onClick={onClick}>
      <ProfileImage profileImage={profileImage} username={username} />
      <Username>{username}</Username>
    </NavigateButton>
  );
}

ProfileSet.propTypes = {
  profileImage: PropTypes.string,
  username: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ProfileSet.defaultProps = {
  profileImage: DEFAULT_PROFILE_IMAGE,
  onClick: () => {},
};

export default ProfileSet;
