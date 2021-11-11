import PropTypes from 'prop-types';

import { Row } from 'src/components/Grid';
import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import UsernameButton from 'src/components/buttons/UsernameButton';

import { Wrapper } from './style';

interface Props {
  image: string;
  username: string;
}

function Profile({ image, username }: Props) {
  return (
    <Wrapper>
      <Row justifyContent='flex-start'>
        <ProfileImageButton image={image} username={username} />
        <UsernameButton username={username} />
      </Row>
    </Wrapper>
  );
}

Profile.propTypes = {
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Profile;
