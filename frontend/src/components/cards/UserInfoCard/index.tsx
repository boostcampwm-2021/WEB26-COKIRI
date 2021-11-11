import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Card from 'src/components/cards/Common';
import FollowButton from 'src/components/buttons/FollowButton';
import { Row, Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import { DEFAULT_PROFILE_IMAGE } from 'src/globals/constants';

import { Wrapper, ImageHolder, Username } from './style';

interface Props {
  targetUser: UserType;
  isMe: boolean;
}

function UserInfoCard({ targetUser, isMe }: Props) {
  const { profileImage, username, postCount, followCount, followerCount, name, bio } = targetUser;
  return (
    <Wrapper>
      <Card width={512} height={196}>
        <Row justifyContent='start'>
          <ImageHolder>
            <Image width={128} height={128} src={profileImage ?? DEFAULT_PROFILE_IMAGE} />
          </ImageHolder>
          <Col alignItems='start'>
            <Row justifyContent='start'>
              <Username>{username}</Username>
              {!isMe && <FollowButton />}
              {isMe && <Link href={`/users/${targetUser.username}/settings`}>settings</Link>}
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

UserInfoCard.prototype = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  isMe: PropTypes.bool.isRequired,
};

export default UserInfoCard;
