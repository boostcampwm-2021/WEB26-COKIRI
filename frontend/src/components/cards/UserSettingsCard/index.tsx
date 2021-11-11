import { useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

import Card from 'src/components/cards/Common';
import { Row, Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import { DEFAULT_PROFILE_IMAGE } from 'src/globals/constants';

import { Wrapper, ImageHolder, ImageCoverButton, SaveButton } from './style';

interface Props {
  user: UserType;
}

function UserSettingsCard({ user }: Props) {
  const [profileImage, setProfileImage] = useState(user.profileImage ?? DEFAULT_PROFILE_IMAGE);
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [bio, SetBio] = useState(user.bio);

  return (
    <Wrapper>
      <Card width={812} height={580}>
        <Col justifyContent='start'>
          <ImageHolder>
            <ImageCoverButton>변경</ImageCoverButton>
            <Image width={168} height={168} src={profileImage} />
          </ImageHolder>
          <Row>
            <p>username</p>
            <input
              placeholder={user.username}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Row>
          <Row>
            <p>name</p>
            <input placeholder={user.name} />
          </Row>
          <Row>
            <p>bio</p>
            <input placeholder={user.bio} />
          </Row>
          <SaveButton>저장</SaveButton>
        </Col>
      </Card>
    </Wrapper>
  );
}

UserSettingsCard.prototype = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserSettingsCard;
