import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { IoSettingsOutline } from 'react-icons/io5';

import CardCommon from 'src/components/cards/Common';
import FollowButton from 'src/components/buttons/FollowButton';
import UnfollowButton from 'src/components/buttons/UnfollowButton';
import NavigateIconButton from 'src/components/buttons/NavigateIconButton';
import ProfileImage from 'src/components/images/ProfileImage';
import { Row, Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import {
  DEFAULT_PROFILE_IMAGE,
  USER_INFO_PROFILE_IMAGE_SIZE,
  USER_INFO_CARD_WIDTH,
} from 'src/globals/constants';

import { Wrapper, ImageHolder, Username } from './style';

interface Props {
  targetUser: UserType;
  user: UserType;
}

function UserInfoCard({ targetUser, user }: Props) {
  const { profileImage, username, postCount, followCount, name, bio } = targetUser;
  const [followerCount, setFollowerCount] = useState(targetUser.followerCount ?? 0);
  const [isFollow, setIsFollow] = useState(user.follows?.includes(targetUser._id!));
  const handleFollow = useCallback(() => {
    setFollowerCount((prevState) => prevState + 1);
    setIsFollow(true);
  }, []);
  const handleUnfollow = useCallback(() => {
    setFollowerCount((prevState) => prevState - 1);
    setIsFollow(false);
  }, []);
  const isMe = useMemo(() => targetUser._id === user._id, [targetUser._id, user._id]);
  const isFollower = useMemo(
    () => user.followers?.includes(targetUser._id!),
    [targetUser._id, user.followers],
  );

  return (
    <Wrapper>
      <CardCommon width={USER_INFO_CARD_WIDTH}>
        <Row>
          <ImageHolder>
            <ProfileImage
              size={USER_INFO_PROFILE_IMAGE_SIZE}
              profileImage={profileImage ?? DEFAULT_PROFILE_IMAGE}
            />
          </ImageHolder>
          <Col>
            <Row>
              <Username>{username}</Username>
              {isMe ? (
                <NavigateIconButton href={`/users/${targetUser.username}/settings`}>
                  <IoSettingsOutline />
                </NavigateIconButton>
              ) : (
                (() => {
                  if (isFollow) {
                    return (
                      <UnfollowButton targetUserID={targetUser._id!} onUnfollow={handleUnfollow} />
                    );
                  }
                  return (
                    <FollowButton
                      isFollower={isFollower!}
                      targetUserID={targetUser._id!}
                      onFollow={handleFollow}
                    />
                  );
                })()
              )}
            </Row>
            <Row>
              <p>{postCount} posts</p>
              <p>{followerCount} followers</p>
              <p>{followCount} following</p>
            </Row>
            <Row>
              <p>{name}</p>
            </Row>
            <Row>
              <p>{bio}</p>
            </Row>
          </Col>
        </Row>
      </CardCommon>
    </Wrapper>
  );
}

UserInfoCard.prototype = {
  targetUser: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserInfoCard;
