import PropTypes from 'prop-types';

import { Row } from 'src/components/Grid';
import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import UsernameButton from 'src/components/buttons/UsernameButton';

import { Wrapper } from './style';

interface Props {
  image: string;
  username?: string;
}

function Profile({ image, username }: Props) {
  const profileImage = image || '/images/default_profile_image.jpg';

  return (
    <Wrapper>
      <Row justifyContent='flex-start'>
        <ProfileImageButton image={profileImage} username={username} />
        <UsernameButton username={username} />
      </Row>
    </Wrapper>
  );
}

Profile.propTypes = {
  image: PropTypes.string.isRequired,
  username: PropTypes.string,
};

Profile.defaultProps = {
  username: '',
};

export default Profile;
