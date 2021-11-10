import PropTypes from 'prop-types';

import { Row } from 'src/components/Grid';
import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import UsernameButton from 'src/components/buttons/UsernameButton';

import { Wrapper } from './style';

interface Props {
  imageSrc: string;
  username: string;
}

function Profile({ imageSrc, username }: Props) {
  return (
    <Wrapper>
      <Row justifyContent='flex-start'>
        <ProfileImageButton imageSrc={imageSrc} username={username} />
        <UsernameButton username={username} />
      </Row>
    </Wrapper>
  );
}

Profile.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Profile;
