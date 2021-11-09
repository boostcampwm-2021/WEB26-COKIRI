import { Row } from 'src/components/Grid';
import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import UsernameButton from 'src/components/buttons/UserNameButton';

import { Wrapper } from './style';

function Profile() {
  return (
    <Wrapper>
      <Row justifyContent='flex-start'>
        <ProfileImageButton href='users/123' imageSrc='/images/logo.svg' />
        <UsernameButton href='user/123' userName='tiger' />
      </Row>
    </Wrapper>
  );
}

export default Profile;
