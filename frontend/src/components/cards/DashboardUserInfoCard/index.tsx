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
import DashboardUserInfoSettingButton from 'src/components/buttons/dashboardSettings/DashboardUserInfoSettingButton';
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

import { Content } from './style';

interface Props {
  dashboardUserInfo: DashboardUserInfoType;
  targetUserName: string;
  // eslint-disable-next-line no-unused-vars
  onEditDashboardUserInfo: (newDashboardUserInfo: DashboardUserInfoType) => void;
}

function DashboardUserInfoCard({
  dashboardUserInfo,
  targetUserName,
  onEditDashboardUserInfo,
}: Props) {
  const user = useRecoilValue(userAtom);
  const isMe = user.username === targetUserName;
  const birthday = dashboardUserInfo.birthday ? new Date(dashboardUserInfo.birthday) : '';

  return (
    <CardCommon width={DASHBOARD_LEFT_SECTION_CARD_WIDTH}>
      <Row justifyContent='space-evenly'>
        <ProfileImage
          size={USER_INFO_PROFILE_IMAGE_SIZE}
          profileImage={DEFAULT_PROFILE_IMAGE}
          marginRight={USER_INFO_PROFILE_IMAGE_MARGIN_RIGHT}
        />
        <Col>
          <Row alignItems='center'>
            <IoPersonOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <Content>이름</Content>
              <Content>{dashboardUserInfo.name}</Content>
            </Col>
          </Row>
          <Row alignItems='center'>
            <IoCallOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <Content>연락처</Content>
              <Content>{dashboardUserInfo.phoneNumber}</Content>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row alignItems='center'>
            <IoCalendarClearOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <Content>생년 월일</Content>
              <Content>
                {birthday
                  ? `${birthday.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`
                  : ''}
              </Content>
            </Col>
          </Row>
          <Row alignItems='center'>
            <IoMailOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <Content>이메일</Content>
              <Content>{dashboardUserInfo.email}</Content>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row alignItems='center'>
            <IoLocationOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <Content>주소지</Content>
              <Content>{dashboardUserInfo.region}</Content>
            </Col>
          </Row>
          <Row alignItems='center'>
            <BsPencil size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <Content>학력</Content>
              <Content>{dashboardUserInfo.school}</Content>
            </Col>
          </Row>
        </Col>
        {isMe && (
          <DashboardUserInfoSettingButton
            dashboardUserInfo={dashboardUserInfo}
            onEditDashboardUserInfo={onEditDashboardUserInfo}
          />
        )}
      </Row>
    </CardCommon>
  );
}

DashboardUserInfoCard.propTypes = {
  dashboardUserInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  targetUserName: PropTypes.string.isRequired,
  onEditDashboardUserInfo: PropTypes.func.isRequired,
};

export default DashboardUserInfoCard;
