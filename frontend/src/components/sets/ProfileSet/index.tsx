import PropTypes from 'prop-types';

import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import UsernameButton from 'src/components/buttons/UsernameButton';

import {
  DEFAULT_PROFILE_IMAGE,
  POST_PROFILE_IMAGE_BUTTON_MARGIN_RIGHT,
  POST_USERNAME_BUTTON_MARGIN_RIGHT,
} from 'src/globals/constants';

import { Wrapper } from './style';

interface Props {
  profileImage?: string;
  username?: string;
}

function ProfileSet({ profileImage, username }: Props) {
  return (
    <Wrapper>
      <ProfileImageButton
        profileImage={profileImage!}
        username={username!}
        marginRight={POST_PROFILE_IMAGE_BUTTON_MARGIN_RIGHT}
      />
      <UsernameButton username={username!} marginRight={POST_USERNAME_BUTTON_MARGIN_RIGHT} />
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
