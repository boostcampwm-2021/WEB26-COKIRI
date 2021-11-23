import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoSettingsOutline } from 'react-icons/io5';

import CardCommon from 'src/components/cards/Common';
import NavigateIconButton from 'src/components/buttons/NavigateIconButton';
import ProfileImage from 'src/components/images/ProfileImage';
import FollowSet from 'src/components/sets/FollowSet';
import FollowsButton from 'src/components/buttons/FollowsButton';
import FollowersButton from 'src/components/buttons/FollowersButton';
import ButtonCommon from 'src/components/buttons/Common';
import { Row, Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import {
  DEFAULT_PROFILE_IMAGE,
  USER_INFO_PROFILE_IMAGE_SIZE,
  USER_INFO_CARD_WIDTH,
} from 'src/globals/constants';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import { Username } from './style';

interface Props {
  targetUser: UserType;
}

function UserInfoCard({ targetUser }: Props) {
  const user = useRecoilValue(userAtom);
  const { _id, profileImage, username, postCount, followCount, name, bio } = targetUser;
  const [followerCount, setFollowerCount] = useState(targetUser.followerCount ?? 0);

  const isMe = _id === user._id;
  const handleFollow = () => setFollowerCount((prevState) => prevState + 1);
  const handleUnfollow = () => setFollowerCount((prevState) => prevState - 1);
  const handleLogoutClick = () => Fetcher.getLogout();

  return (
    <CardCommon width={USER_INFO_CARD_WIDTH}>
      <Row alignItems='center' justifyContent='center'>
        <ProfileImage
          size={USER_INFO_PROFILE_IMAGE_SIZE}
          profileImage={profileImage ?? DEFAULT_PROFILE_IMAGE}
        />
        <Col>
          <Row alignItems='center' justifyContent='center'>
            <Username>{username}</Username>
            {isMe && (
              <>
                <NavigateIconButton href={`/users/${username}/settings`}>
                  <IoSettingsOutline />
                </NavigateIconButton>
                <ButtonCommon onClick={handleLogoutClick}>로그아웃</ButtonCommon>
              </>
            )}
            <FollowSet targetUserID={_id!} onFollow={handleFollow} onUnfollow={handleUnfollow} />
          </Row>
          <Row alignItems='center' justifyContent='center'>
            <p>{postCount} posts</p>
            <FollowsButton
              count={isMe ? user.follows!.length! : followCount!}
              targetUserID={_id!}
            />
            <FollowersButton
              count={isMe ? user.followers!.length! : followerCount!}
              targetUserID={_id!}
            />
            <NavigateIconButton href={`/users/${username}/dashboard`}>Dashboard</NavigateIconButton>
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
  );
}

UserInfoCard.prototype = {
  targetUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserInfoCard;
