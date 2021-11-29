import PropTypes from 'prop-types';

import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import UsernameButton from 'src/components/buttons/UsernameButton';

import {
  POST_PROFILE_IMAGE_BUTTON_MARGIN_RIGHT,
  POST_USERNAME_BUTTON_MARGIN_RIGHT,
} from 'src/globals/constants';
import { DEFAULT_PROFILE_IMAGE } from 'src/globals/images';

import { Wrapper } from './style';

interface Props {
  profileImage?: string;
  username: string;
  marginLeft?: number;
  onClick: VoidFunction;
}

function ProfileSet({ profileImage, username, marginLeft, onClick }: Props) {
  return (
    <Wrapper marginLeft={marginLeft!} onClick={onClick}>
      <ProfileImageButton
        profileImage={profileImage!}
        username={username}
        marginRight={POST_PROFILE_IMAGE_BUTTON_MARGIN_RIGHT}
      />
      <UsernameButton username={username} marginRight={POST_USERNAME_BUTTON_MARGIN_RIGHT} />
    </Wrapper>
  );
}

ProfileSet.propTypes = {
  profileImage: PropTypes.string,
  username: PropTypes.string.isRequired,
  marginLeft: PropTypes.number,
  onClick: PropTypes.func,
};

ProfileSet.defaultProps = {
  profileImage: DEFAULT_PROFILE_IMAGE,
  marginLeft: 0,
  onClick: () => {},
};

export default ProfileSet;
