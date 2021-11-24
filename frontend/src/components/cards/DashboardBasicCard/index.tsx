import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
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
import DashboardBasicSettingButton from 'src/components/buttons/dashboardSettings/DashboardBasicSettingButton';
import { Row, Col } from 'src/components/Grid';

import {
  USER_INFO_PROFILE_IMAGE_SIZE,
  DEFAULT_PROFILE_IMAGE,
  USER_INFO_PROFILE_IMAGE_MARGIN_RIGHT,
  DASHBOARD_LEFT_SECTION_CARD_WIDTH,
  DASHBOARD_USER_INFO_ICON_SIZE,
  DASHBOARD_USER_INFO_COL_MARGIN,
} from 'src/globals/constants';

import dashboardUserInfoAtom from 'src/recoil/dashboardUserInfo';
import userAtom from 'src/recoil/user';

import { getBirthdayFormat } from 'src/utils/moment';

import { Content } from './style';

function DashboardBasicCard() {
  const user = useRecoilValue(userAtom);
  const dashboardUserInfo = useRecoilValue(dashboardUserInfoAtom);
  const { name, phoneNumber, email, birthday, region, school } = dashboardUserInfo;
  const router = useRouter();
  const username = router.query.username as string;

  const isMe = user.username === username;

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
              <Content>{name}</Content>
            </Col>
          </Row>
          <Row alignItems='center'>
            <IoCallOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <Content>연락처</Content>
              <Content>{phoneNumber}</Content>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row alignItems='center'>
            <IoCalendarClearOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <Content>생년 월일</Content>
              <Content>{getBirthdayFormat(birthday)}</Content>
            </Col>
          </Row>
          <Row alignItems='center'>
            <IoMailOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <Content>이메일</Content>
              <Content>{email}</Content>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row alignItems='center'>
            <IoLocationOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <Content>주소지</Content>
              <Content>{region}</Content>
            </Col>
          </Row>
          <Row alignItems='center'>
            <BsPencil size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <Content>학력</Content>
              <Content>{school}</Content>
            </Col>
          </Row>
        </Col>
        {isMe && <DashboardBasicSettingButton />}
      </Row>
    </CardCommon>
  );
}

export default DashboardBasicCard;
