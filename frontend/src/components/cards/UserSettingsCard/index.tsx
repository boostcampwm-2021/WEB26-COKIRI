import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';

import CardCommon from 'src/components/cards/Common';
import InputCommon from 'src/components/inputs/Common';
import ButtonCommon from 'src/components/buttons/Common';
import ImageInput from 'src/components/inputs/ImageInput';
import ProfileImage from 'src/components/images/ProfileImage';
import { Row } from 'src/components/Grid';

import { USER_SETTING_CARD_WIDTH, USER_SETTING_PROFILE_IMAGE_SIZE } from 'src/globals/constants';
import { DEFAULT_PROFILE_IMAGE } from 'src/globals/images';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

import { Label, ImageHolder, ImageCover } from './style';

function UserSettingsCard() {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);
  const [profileImage, setProfileImage] = useState(user.profileImage ?? DEFAULT_PROFILE_IMAGE);
  const [username, setUsername] = useState(user.username ?? '');
  const [name, setName] = useState(user.name ?? '');
  const [bio, setBio] = useState(user.bio ?? '');
  const mutation = useMutation(
    () => Fetcher.putUserSettings(user, { profileImage, username, name, bio }),
    {
      onSuccess: async () => {
        setUser({ ...user, profileImage, username, name, bio });
        await router.push(`/users/${username}`, '', { shallow: true });
      },
    },
  );

  const handleClick = useCallback(() => mutation.mutate(), [mutation]);
  const handleImageUpload = useCallback((url: string) => setProfileImage(url), []);

  return (
    <CardCommon width={USER_SETTING_CARD_WIDTH}>
      <Row justifyContent='center'>
        <ImageHolder>
          <ImageInput onImageUpload={handleImageUpload}>
            <ImageCover>변경</ImageCover>
          </ImageInput>
          <ProfileImage
            size={USER_SETTING_PROFILE_IMAGE_SIZE}
            profileImage={profileImage}
            username={username}
          />
        </ImageHolder>
      </Row>
      <Row justifyContent='center'>
        <Label>username</Label>
        <InputCommon bind={[username, setUsername]} placeholder={user.username} title='username' />
      </Row>
      <Row justifyContent='center'>
        <Label>name</Label>
        <InputCommon bind={[name, setName]} placeholder={user.name} title='name' />
      </Row>
      <Row justifyContent='center'>
        <Label>bio</Label>
        <InputCommon bind={[bio, setBio]} placeholder={user.bio} title='bio' />
      </Row>
      <Row justifyContent='end'>
        <ButtonCommon onClick={handleClick} title='save'>
          저장
        </ButtonCommon>
      </Row>
    </CardCommon>
  );
}

export default UserSettingsCard;
