import PropTypes from 'prop-types';

import { Row } from 'src/components/Grid';
import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import UsernameButton from 'src/components/buttons/UserNameButton';

import { Wrapper } from './style';

interface Props {
  href: string;
  imageSrc: string;
  userName: string;
}

function Profile({ href, imageSrc, userName }: Props) {
  return (
    <Wrapper>
      <Row justifyContent='flex-start'>
        <ProfileImageButton href={href} imageSrc={imageSrc} />
        <UsernameButton href={href} userName={userName} />
      </Row>
    </Wrapper>
  );
}

Profile.propTypes = {
  href: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Profile;
