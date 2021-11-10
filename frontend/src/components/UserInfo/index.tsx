import Image from 'next/image';
import PropTypes from 'prop-types';

import Card from 'src/components/cards/Common';
import { Row, Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import { Wrapper, Username } from './style';

interface Props {
  user: UserType;
}

function UserInfo({ user }: Props) {
  return (
    <Wrapper>
      <Card width={496} height={256}>
        <Row>
          <Image width={256} height={256} src='/images/default_profile_image.jpg' />

          <Col alignItems='start'>
            <Row justifyContent='start'>
              <Username>{user.username}</Username>
              <button type='button'>follow</button>
            </Row>

            <Row justifyContent='start'>
              <p>{user.postCount} posts</p>
              <p>{user.followerCount} followers</p>
              <p>{user.followCount} following</p>
            </Row>
            <Row justifyContent='start'>
              <p>이름</p>
            </Row>
            <Row justifyContent='start'>
              <p>BIO</p>
            </Row>
          </Col>
        </Row>
      </Card>
    </Wrapper>
  );
}

UserInfo.prototype = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default UserInfo;
