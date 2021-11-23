import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import {
  IoPersonOutline,
  IoCalendarClearOutline,
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
} from 'react-icons/io5';
import { BsPencil } from 'react-icons/bs';

import CardCommon from 'src/components/cards/Common';
import ProfileImage from 'src/components/images/ProfileImage';
import UserInfoSettingButton from 'src/components/buttons/dashboardSettings/UserInfoSettingButton';
import { Row, Col } from 'src/components/Grid';

import {
  USER_INFO_PROFILE_IMAGE_SIZE,
  DEFAULT_PROFILE_IMAGE,
  USER_INFO_PROFILE_IMAGE_MARGIN_RIGHT,
  DASHBOARD_LEFT_SECTION_CARD_WIDTH,
  DASHBOARD_USER_INFO_ICON_SIZE,
  DASHBOARD_USER_INFO_COL_MARGIN,
} from 'src/globals/constants';

import userAtom from 'src/recoil/user';

import { DashboardUserInfoType } from 'src/types';

interface Props {
  name?: string;
  phoneNumber?: string;
  birthday?: string;
  email?: string;
  region?: string;
  school?: string;
  bio?: String;
  targetUserName: string;
  // eslint-disable-next-line no-unused-vars
  onEditDashboardUserInfo: (newDashboardUserInfo: DashboardUserInfoType) => void;
}

function DashboardUserInfoCard({
  name,
  phoneNumber,
  birthday,
  email,
  region,
  school,
  bio,
  targetUserName,
  onEditDashboardUserInfo,
}: Props) {
  const user = useRecoilValue(userAtom);
  const isMe = user.username === targetUserName;
  return (
    <CardCommon width={DASHBOARD_LEFT_SECTION_CARD_WIDTH}>
      <Row justifyContent='space-between'>
        <ProfileImage
          size={USER_INFO_PROFILE_IMAGE_SIZE}
          profileImage={DEFAULT_PROFILE_IMAGE}
          marginRight={USER_INFO_PROFILE_IMAGE_MARGIN_RIGHT}
        />
        <Col>
          <Row alignItems='center'>
            <IoPersonOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <p>이름</p>
              <p>{name}</p>
            </Col>
          </Row>
          <Row alignItems='center'>
            <IoCallOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <p>연락처</p>
              <p>{phoneNumber}</p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row alignItems='center'>
            <IoCalendarClearOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <p>생년 월일</p>
              <p>{birthday}</p>
            </Col>
          </Row>
          <Row alignItems='center'>
            <IoMailOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <p>이메일</p>
              <p>{email}</p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row alignItems='center'>
            <IoLocationOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <p>주소지</p>
              <p>{region}</p>
            </Col>
          </Row>
          <Row alignItems='center'>
            <BsPencil size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <p>학력</p>
              <p>{school}</p>
            </Col>
          </Row>
        </Col>
        {isMe && <UserInfoSettingButton />}
      </Row>
      <p>{bio}</p>
    </CardCommon>
  );
}

DashboardUserInfoCard.propTypes = {
  name: PropTypes.string,
  phoneNumber: PropTypes.string,
  birthday: PropTypes.string,
  email: PropTypes.string,
  region: PropTypes.string,
  school: PropTypes.string,
  bio: PropTypes.string,
  targetUserName: PropTypes.string.isRequired,
  onEditDashboardUserInfo: PropTypes.func.isRequired,
};

DashboardUserInfoCard.defaultProps = {
  name: '',
  phoneNumber: '',
  birthday: '',
  email: '',
  region: '',
  school: '',
  bio: '',
};

export default DashboardUserInfoCard;
