import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import ImageInput from 'src/components/inputs/ImageInput';
import InputCommon from 'src/components/inputs/Common';
import ProfileImage from 'src/components/images/ProfileImage';
import { Row, Col } from 'src/components/Grid';

import { USER_SETTING_PROFILE_IMAGE_SIZE } from 'src/globals/constants';
import { DEFAULT_PROFILE_IMAGE } from 'src/globals/images';

import userAtom from 'src/recoil/user';
import dashboardUserInfoAtom from 'src/recoil/dashboardUserInfo';

import { Fetcher } from 'src/utils';

import { Label, ImageHolder, ImageCover } from './style';

interface Props {
  onClose: VoidFunction;
}

function DashboardBasicSettingModal({ onClose }: Props) {
  const user = useRecoilValue(userAtom);
  const [dashboardUserInfo, setDashboardUserInfo] = useRecoilState(dashboardUserInfoAtom);

  const [name, setName] = useState(dashboardUserInfo.name ?? '');
  const [email, setEmail] = useState(dashboardUserInfo.email ?? '');
  const [school, setSchool] = useState(dashboardUserInfo.school ?? '');
  const [region, setRegion] = useState(dashboardUserInfo.region ?? '');
  const [birthday, setBirthday] = useState(dashboardUserInfo.birthday ?? '');
  const [phoneNumber, setPhoneNumber] = useState(dashboardUserInfo.phoneNumber ?? '');
  const [profileImage, setProfileImage] = useState(
    dashboardUserInfo.profileImage ?? DEFAULT_PROFILE_IMAGE,
  );

  const { mutate } = useMutation(
    () =>
      Fetcher.putDashboardUserInfo(user, {
        ...dashboardUserInfo,
        name,
        phoneNumber,
        birthday,
        region,
        school,
        email,
        profileImage,
      }),
    {
      onSuccess: (dashboard) => {
        setDashboardUserInfo(dashboard);
        onClose();
      },
    },
  );

  const handleImageUpload = (url: string) => {
    setProfileImage(url);
  };

  const handleConfirm = () => {
    mutate();
  };

  return (
    <ModalCommon
      width={800}
      onConfirm={handleConfirm}
      onClose={onClose}
      confirm='저장'
      close='취소'
    >
      <ImageHolder>
        <ImageInput onImageUpload={handleImageUpload}>
          <ImageCover>변경</ImageCover>
        </ImageInput>
        <ProfileImage size={USER_SETTING_PROFILE_IMAGE_SIZE} profileImage={profileImage} />
      </ImageHolder>
      <Row justifyContent='space-evenly'>
        <Col>
          <Row>
            <Label>name</Label>
            <InputCommon bind={[name, setName]} placeholder={name} />
          </Row>
          <Row>
            <Label>birthday</Label>
            <InputCommon bind={[birthday, setBirthday]} placeholder={birthday} />
          </Row>
          <Row>
            <Label>region</Label>
            <InputCommon bind={[region, setRegion]} placeholder={region} />
          </Row>
          <Row>
            <Label>phone number</Label>
            <InputCommon bind={[phoneNumber, setPhoneNumber]} placeholder={phoneNumber} />
          </Row>
          <Row>
            <Label>email</Label>
            <InputCommon bind={[email, setEmail]} placeholder={email} />
          </Row>
          <Row>
            <Label>school</Label>
            <InputCommon bind={[school, setSchool]} placeholder={school} />
          </Row>
        </Col>
      </Row>
    </ModalCommon>
  );
}

DashboardBasicSettingModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DashboardBasicSettingModal;
