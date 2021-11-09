import { Row } from 'src/components/Grid';
import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import ProfileUsernameButton from 'src/components/buttons/ProfileUsernameButton';

import { Wrapper } from './style';

function Profile() {
  return (
    <Wrapper>
      <Row justifyContent='flex-start'>
        <ProfileImageButton href='users/123' imgSrc='/images/logo.svg' />
        <ProfileUsernameButton href='user/123' userName='tiger' />
      </Row>
    </Wrapper>
  );
}

export default Profile;
