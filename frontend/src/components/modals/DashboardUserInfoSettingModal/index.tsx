import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import ImageInput from 'src/components/inputs/ImageInput';
import InputCommon from 'src/components/inputs/Common';
import ProfileImage from 'src/components/images/ProfileImage';
import { Row, Col } from 'src/components/Grid';

import { DEFAULT_PROFILE_IMAGE, USER_SETTING_PROFILE_IMAGE_SIZE } from 'src/globals/constants';

import userAtom from 'src/recoil/user';

import { DashboardUserInfoType } from 'src/types';

import { Fetcher } from 'src/utils';

import { Label, ImageHolder, ImageCover } from './style';

interface Props {
  onClose: () => void;
  dashboardUserInfo: DashboardUserInfoType;
  // eslint-disable-next-line no-unused-vars
  onEditDashboardUserInfo: (newDashboardUserInfo: DashboardUserInfoType) => void;
}

function DashboardUserInfoSettingModal({
  onClose,
  dashboardUserInfo,
  onEditDashboardUserInfo,
}: Props) {
  const user = useRecoilValue(userAtom);
  const [name, setName] = useState(dashboardUserInfo.name ?? '');
  const [phoneNumber, setPhoneNumber] = useState(dashboardUserInfo.phoneNumber ?? '');
  const [birthday, setBirthday] = useState(dashboardUserInfo.birthday ?? '');
  const [region, setRegion] = useState(dashboardUserInfo.region ?? '');
  const [school, setSchool] = useState(dashboardUserInfo.school ?? '');
  const [email, setEmail] = useState(dashboardUserInfo.email ?? '');
  const [github, setGitHub] = useState(dashboardUserInfo.github ?? '');
  const [blog, setBlog] = useState(dashboardUserInfo.blog ?? '');
  const [solvedac, setSolvedac] = useState(dashboardUserInfo.solvedac ?? '');
  const [profileImage, setProfileImage] = useState(
    dashboardUserInfo.profileImage ?? DEFAULT_PROFILE_IMAGE,
  );
  // const [jobObjectives, setJobObjectives] = useState([]);
  // const [techStacks, setTechStacks] = useState<{ [field: string]: StackType[] }>([]);

  const { mutate } = useMutation(
    () => {
      const newDashboardUserInfo: DashboardUserInfoType = {
        name,
        phoneNumber,
        birthday,
        region,
        school,
        solvedac,
        profileImage,
        jobObjectives: [],
        techStacks: {},
      };
      if (email) {
        newDashboardUserInfo.email = email;
      }
      if (github) {
        newDashboardUserInfo.github = github;
      }
      if (blog) {
        newDashboardUserInfo.blog = blog;
      }
      return Fetcher.putDashboardUserInfo(user, newDashboardUserInfo);
    },
    {
      onSuccess: (dashboard) => onEditDashboardUserInfo(dashboard),
    },
  );

  const handleImageUpload = (url: string) => {
    setProfileImage(url);
  };

  const handleConfirm = () => {
    mutate();
    onClose();
  };

  return (
    <ModalCommon
      width={1200}
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
        <Col>
          <Row>
            <Label>desired job</Label>
            {/* <InputCommon bind={[jobObjectives, setJobObjectives]} placeholder='' /> */}
          </Row>
          <Row>
            <Label>GitHub</Label>
            <InputCommon bind={[github, setGitHub]} placeholder={github} />
          </Row>
          <Row>
            <Label>blog</Label>
            <InputCommon bind={[blog, setBlog]} placeholder={blog} />
          </Row>
          <Row>
            <Label>solved.ac</Label>
            <InputCommon bind={[solvedac, setSolvedac]} placeholder={solvedac} />
          </Row>
          <Row>
            <Label>tech stacks</Label>
            {/* <InputCommon bind={[techStacks, setTechStacks]} placeholder='' /> */}
          </Row>
        </Col>
      </Row>
    </ModalCommon>
  );
}

DashboardUserInfoSettingModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  dashboardUserInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  onEditDashboardUserInfo: PropTypes.func.isRequired,
};

export default DashboardUserInfoSettingModal;
