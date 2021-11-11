import Image from 'next/image';
import PropTypes from 'prop-types';

import Card from 'src/components/cards/Common';
import FollowButton from 'src/components/buttons/FollowButton';
import { Row, Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import { Wrapper, ImageHolder, Username } from './style';

interface Props {
  targetUser: UserType;
  isMe: boolean;
}

function UserInfo({ targetUser, isMe }: Props) {
  const { profileImage, username, postCount, followCount, followerCount, name, bio } = targetUser;
  return (
    <Wrapper>
      <Card width={512} height={196}>
        <Row>
          <ImageHolder>
            {profileImage === undefined ? (
              <Image width={256} height={256} src='/images/default_profile_image.jpg' />
            ) : (
              <Image width={256} height={256} src={profileImage} />
            )}
          </ImageHolder>
          <Col alignItems='start'>
            <Row justifyContent='start'>
              <Username>{username}</Username>
              {!isMe && <FollowButton />}
              {isMe && <button type='button'>settings</button>}
            </Row>
            <Row justifyContent='start'>
              <p>{postCount} posts</p>
              <p>{followerCount} followers</p>
              <p>{followCount} following</p>
            </Row>
            <Row justifyContent='start'>
              <p>{name}</p>
            </Row>
            <Row justifyContent='start'>
              <p>{bio}</p>
            </Row>
          </Col>
        </Row>
      </Card>
    </Wrapper>
  );
}

UserInfo.prototype = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  isMe: PropTypes.bool.isRequired,
};

export default UserInfo;
