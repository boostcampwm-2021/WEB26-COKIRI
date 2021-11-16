import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

import CardCommon from 'src/components/cards/Common';
import Input from 'src/components/inputs/Common';
import Button from 'src/components/buttons/Common';
import ImageInput from 'src/components/inputs/ImageInput';
import ProfileImage from 'src/components/images/ProfileImage';
import { Row } from 'src/components/Grid';

import {
  USER_SETTING_CARD_WIDTH,
  DEFAULT_PROFILE_IMAGE,
  USER_SETTING_PROFILE_IMAGE_SIZE,
} from 'src/globals/constants';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

import { Label, ImageHolder, ImageCover } from './style';

function UserSettingsCard() {
  const user = useRecoilValue(userAtom);
  const [profileImage, setProfileImage] = useState(user.profileImage ?? DEFAULT_PROFILE_IMAGE);
  const [username, setUsername] = useState(user.username ?? '');
  const [name, setName] = useState(user.name ?? '');
  const [bio, setBio] = useState(user.bio ?? '');
  const mutation = useMutation(() =>
    Fetcher.putUserSettings(user, { profileImage, username, name, bio }),
  );

  const handleClick = () => {
    mutation.mutate();
  };

  const handleImageUpload = (url: string) => {
    setProfileImage(url);
  };

  return (
    <CardCommon width={USER_SETTING_CARD_WIDTH}>
      <Row justifyContent='center'>
        <ImageHolder>
          <ImageInput onImageUpload={handleImageUpload}>
            <ImageCover>변경</ImageCover>
          </ImageInput>
          <ProfileImage size={USER_SETTING_PROFILE_IMAGE_SIZE} profileImage={profileImage} />
        </ImageHolder>
      </Row>
      <Row justifyContent='center'>
        <Label>username</Label>
        <Input bind={[username, setUsername]} placeholder={user.username} />
      </Row>
      <Row justifyContent='center'>
        <Label>name</Label>
        <Input bind={[name, setName]} placeholder={user.name} />
      </Row>
      <Row justifyContent='center'>
        <Label>bio</Label>
        <Input bind={[bio, setBio]} placeholder={user.bio} />
      </Row>
      <Row justifyContent='end'>
        <Button onClick={handleClick} margin={24}>
          저장
        </Button>
      </Row>
    </CardCommon>
  );
}

export default UserSettingsCard;
