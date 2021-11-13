import PropTypes from 'prop-types';

import { Row } from 'src/components/Grid';
import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import UsernameButton from 'src/components/buttons/UsernameButton';

import { Wrapper } from './style';

interface Props {
  image: string;
  username?: string;
}

function ProfileSet({ image, username }: Props) {
  const profileImage = image ?? '/images/default_profile_image.jpg';

  return (
    <Wrapper>
      <Row justifyContent='start'>
        <ProfileImageButton image={profileImage} username={username} />
        <UsernameButton username={username} />
      </Row>
    </Wrapper>
  );
}

ProfileSet.propTypes = {
  image: PropTypes.string.isRequired,
  username: PropTypes.string,
};

ProfileSet.defaultProps = {
  username: '',
};

export default ProfileSet;
