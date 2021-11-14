import Image from 'next/image';
import PropTypes from 'prop-types';
import { IoSettingsOutline } from 'react-icons/io5';

import CardCommon from 'src/components/cards/Common';
import FollowButton from 'src/components/buttons/FollowButton';
import NavigateIconButton from 'src/components/buttons/NavigateIconButton';
import { Row, Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import {
  DEFAULT_PROFILE_IMAGE,
  USER_INFO_CARD_IMAGE_HEIGHT,
  USER_INFO_CARD_IMAGE_WIDTH,
  USER_INFO_CARD_WIDTH,
} from 'src/globals/constants';

import { Wrapper, ImageHolder, Username } from './style';

interface Props {
  targetUser: UserType;
  isMe: boolean;
}

function UserInfoCard({ targetUser, isMe }: Props) {
  const { profileImage, username, postCount, followCount, followerCount, name, bio } = targetUser;
  return (
    <Wrapper>
      <CardCommon width={USER_INFO_CARD_WIDTH}>
        <Row justifyContent='start'>
          <ImageHolder>
            <Image
              width={USER_INFO_CARD_IMAGE_WIDTH}
              height={USER_INFO_CARD_IMAGE_HEIGHT}
              src={profileImage ?? DEFAULT_PROFILE_IMAGE}
            />
          </ImageHolder>
          <Col alignItems='start'>
            <Row justifyContent='start'>
              <Username>{username}</Username>
              {!isMe && <FollowButton targetUserID={targetUser._id!} />}
              {isMe && (
                <NavigateIconButton href={`/users/${targetUser.username}/settings`}>
                  <IoSettingsOutline />
                </NavigateIconButton>
              )}
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
      </CardCommon>
    </Wrapper>
  );
}

UserInfoCard.prototype = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  isMe: PropTypes.bool.isRequired,
};

export default UserInfoCard;
