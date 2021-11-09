import { Row } from 'src/components/Grid';
import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import ProfileUserNameButton from 'src/components/buttons/ProfileUserNameButton';

import { Wrapper } from './style';

function profileButton() {
  return (
    <Wrapper>
      <Row justifyContent='flex-start'>
        <ProfileImageButton href='users/123' imgSrc='/images/logo.svg' />
        <ProfileUserNameButton href='user/123' userName='tiger' />
      </Row>
    </Wrapper>
  );
}

export default profileButton;
