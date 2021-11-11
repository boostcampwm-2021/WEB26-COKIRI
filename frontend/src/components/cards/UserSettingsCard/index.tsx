import { useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';

import Card from 'src/components/cards/Common';
import Input from 'src/components/inputs/Common';
import { Row, Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import { DEFAULT_PROFILE_IMAGE } from 'src/globals/constants';

import { Fetcher } from 'src/utils';

import { Wrapper, ImageHolder, ImageCoverButton, SaveButton } from './style';

interface Props {
  user: UserType;
}

function UserSettingsCard({ user }: Props) {
  // eslint-disable-next-line no-unused-vars
  const [profileImage, setProfileImage] = useState(user.profileImage);
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const mutation = useMutation(() =>
    Fetcher.putUserSettings({ profileImage, username, name, bio }, user),
  );

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <Wrapper>
      <Card width={812}>
        <Col justifyContent='start'>
          <ImageHolder>
            <ImageCoverButton>변경</ImageCoverButton>
            <Image width={168} height={168} src={profileImage ?? DEFAULT_PROFILE_IMAGE} />
          </ImageHolder>
          <Row>
            <p>username</p>
            <Input bind={[username, setUsername]} placeholder={user.username} />
          </Row>
          <Row>
            <p>name</p>
            <Input bind={[name, setName]} placeholder={user.name} />
          </Row>
          <Row>
            <p>bio</p>
            <Input bind={[bio, setBio]} placeholder={user.bio} />
          </Row>
          <SaveButton onClick={handleClick}>저장</SaveButton>
        </Col>
      </Card>
    </Wrapper>
  );
}

UserSettingsCard.prototype = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserSettingsCard;
