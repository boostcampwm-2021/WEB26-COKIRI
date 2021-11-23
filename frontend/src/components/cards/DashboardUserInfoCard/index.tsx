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
import { Row, Col } from 'src/components/Grid';

import {
  USER_INFO_PROFILE_IMAGE_SIZE,
  DEFAULT_PROFILE_IMAGE,
  USER_INFO_PROFILE_IMAGE_MARGIN_RIGHT,
} from 'src/globals/constants';
// import { Fetcher } from 'src/utils';

function DashBoardUserInfoCard() {
  // const {data:user} = useQuery(['dashboard','users']()=>Fetcher.유저 데이터);
  return (
    <CardCommon width={700}>
      <Row>
        <ProfileImage
          size={USER_INFO_PROFILE_IMAGE_SIZE}
          profileImage={DEFAULT_PROFILE_IMAGE}
          marginRight={USER_INFO_PROFILE_IMAGE_MARGIN_RIGHT}
        />
        <Col>
          <Row>
            <Row alignItems='center'>
              <IoPersonOutline size={30} />
              <Col margin={8}>
                <p>이름</p>
                <p>한범석</p>
              </Col>
            </Row>
            <Row alignItems='center'>
              <IoCalendarClearOutline size={30} />
              <Col margin={8}>
                <p>생년 월일</p>
                <p>1997.03.07</p>
              </Col>
            </Row>
            <Row alignItems='center'>
              <IoLocationOutline size={30} />
              <Col margin={8}>
                <p>주소지</p>
                <p>경기도 안양시</p>
              </Col>
            </Row>
          </Row>
          <Row>
            <Row alignItems='center'>
              <IoCallOutline size={30} />
              <Col margin={8}>
                <p>연락처</p>
                <p>010-XXXX-XXXX</p>
              </Col>
            </Row>
            <Row alignItems='center'>
              <IoMailOutline size={30} />
              <Col margin={8}>
                <p>이메일</p>
                <p>example@naver.com</p>
              </Col>
            </Row>
            <Row alignItems='center'>
              <BsPencil size={30} />
              <Col margin={8}>
                <p>학력</p>
                <p>harvard university</p>
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>
    </CardCommon>
  );
}

export default DashBoardUserInfoCard;
