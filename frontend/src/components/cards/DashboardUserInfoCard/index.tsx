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

import { DashboardType } from 'src/types';

import userAtom from 'src/recoil/user';

interface Props {
  dashboard?: DashboardType;
  username: string;
}

function DashboardUserInfoCard({ username, dashboard }: Props) {
  const user = useRecoilValue(userAtom);
  const isMe = user.username === username;
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
              <p>{dashboard?.name}</p>
            </Col>
          </Row>
          <Row alignItems='center'>
            <IoCallOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <p>연락처</p>
              <p>{dashboard?.phoneNumber}</p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row alignItems='center'>
            <IoCalendarClearOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <p>생년 월일</p>
              <p>{dashboard?.birthday}</p>
            </Col>
          </Row>
          <Row alignItems='center'>
            <IoMailOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <p>이메일</p>
              <p>{dashboard?.email}</p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row alignItems='center'>
            <IoLocationOutline size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <p>주소지</p>
              <p>{dashboard?.region}</p>
            </Col>
          </Row>
          <Row alignItems='center'>
            <BsPencil size={DASHBOARD_USER_INFO_ICON_SIZE} />
            <Col margin={DASHBOARD_USER_INFO_COL_MARGIN}>
              <p>학력</p>
              <p>{dashboard?.school}</p>
            </Col>
          </Row>
        </Col>
        {isMe && <UserInfoSettingButton />}
      </Row>
    </CardCommon>
  );
}

DashboardUserInfoCard.propTypes = {
  dashboard: PropTypes.objectOf(PropTypes.any),
  username: PropTypes.string.isRequired,
};

DashboardUserInfoCard.defaultProps = {
  dashboard: {},
};

export default DashboardUserInfoCard;
