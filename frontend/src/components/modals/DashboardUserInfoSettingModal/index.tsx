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
  // eslint-disable-next-line no-unused-vars
  onEditDashboardUserInfo: (newDashboardUserInfo: DashboardUserInfoType) => void;
}

function DashboardUserInfoSettingModal({ onClose, onEditDashboardUserInfo }: Props) {
  const user = useRecoilValue(userAtom);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [region, setRegion] = useState('');
  const [bio, setBio] = useState('');
  const [school, setSchool] = useState('');
  const [email, setEmail] = useState('');
  const [github, setGitHub] = useState('');
  const [blog, setBlog] = useState('');
  const [solvedac, setSolvedac] = useState('');
  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);
  // const [jobObjectives, setJobObjectives] = useState([]);
  // const [techStacks, setTechStacks] = useState<{ [field: string]: StackType[] }>([]);

  const { mutate } = useMutation(
    () =>
      Fetcher.putDashboardUserInfo(user, {
        name,
        phoneNumber,
        birthday,
        region,
        bio,
        school,
        email,
        github,
        blog,
        solvedac,
        profileImage,
        jobObjectives: [],
        techStacks: {},
      }),
    { onSuccess: ({ data }) => onEditDashboardUserInfo(data!) },
  );

  const handleImageUpload = (url: string) => {
    setProfileImage(url);
  };
  return (
    <ModalCommon width={1200} onConfirm={mutate} onClose={onClose} confirm='저장' close='취소'>
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
            <InputCommon bind={[name, setName]} placeholder='' />
          </Row>
          <Row>
            <Label>birthday</Label>
            <InputCommon bind={[birthday, setBirthday]} placeholder='' />
          </Row>
          <Row>
            <Label>region</Label>
            <InputCommon bind={[region, setRegion]} placeholder='' />
          </Row>
          <Row>
            <Label>phone number</Label>
            <InputCommon bind={[phoneNumber, setPhoneNumber]} placeholder='' />
          </Row>
          <Row>
            <Label>email</Label>
            <InputCommon bind={[email, setEmail]} placeholder='' />
          </Row>
          <Row>
            <Label>school</Label>
            <InputCommon bind={[school, setSchool]} placeholder='' />
          </Row>
          <Row>
            <Label>bio</Label>
            <InputCommon bind={[bio, setBio]} placeholder='' />
          </Row>
        </Col>
        <Col>
          <Row>
            <Label>desired job</Label>
            {/* <InputCommon bind={[jobObjectives, setJobObjectives]} placeholder='' /> */}
          </Row>
          <Row>
            <Label>GitHub</Label>
            <InputCommon bind={[github, setGitHub]} placeholder='' />
          </Row>
          <Row>
            <Label>blog</Label>
            <InputCommon bind={[blog, setBlog]} placeholder='' />
          </Row>
          <Row>
            <Label>solved.ac</Label>
            <InputCommon bind={[solvedac, setSolvedac]} placeholder='' />
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
  onEditDashboardUserInfo: PropTypes.func.isRequired,
};

export default DashboardUserInfoSettingModal;
