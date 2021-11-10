import Image from 'next/image';
import PropTypes from 'prop-types';

import { Row, Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import { Wrapper } from './style';

interface Props {
  user: UserType;
}

function UserInfo({ user }: Props) {
  return (
    <Wrapper>
      <Row>
        <Image width={100} height={100} src='/images/default_profile_image.jpg' />

        <Col alignItems='start'>
          <Row>
            <p>{user.username}</p>
            <button type='button'>follow</button>
          </Row>

          <Row justifyContent='start'>
            <p>3 posts</p>
            <p>{user.followerCount} followers</p>
            <p>{user.followCount} following</p>
          </Row>
          <p>이름</p>
          <p>BIO</p>
        </Col>
      </Row>
    </Wrapper>
  );
}

UserInfo.prototype = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default UserInfo;
