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
import { Row, Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import { USER_INFO_PROFILE_IMAGE_SIZE, USER_INFO_CARD_WIDTH } from 'src/globals/constants';
import { DEFAULT_PROFILE_IMAGE } from 'src/globals/images';

import userAtom from 'src/recoil/user';

import { Username, Name, Bio, Posts } from './style';

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

  return (
    <CardCommon width={USER_INFO_CARD_WIDTH}>
      <Row alignItems='center' justifyContent='center'>
        <ProfileImage
          size={USER_INFO_PROFILE_IMAGE_SIZE}
          profileImage={profileImage ?? DEFAULT_PROFILE_IMAGE}
        />
        <Col>
          <Row alignItems='center'>
            <Username>{username}</Username>
            {isMe && (
              <NavigateIconButton href={`/users/${username}/settings`}>
                <IoSettingsOutline />
              </NavigateIconButton>
            )}
            <FollowSet targetUserID={_id!} onFollow={handleFollow} onUnfollow={handleUnfollow} />
            <NavigateIconButton href={`/users/${username}/dashboard`}>대쉬보드</NavigateIconButton>
          </Row>
          <Row alignItems='center'>
            <Posts>{postCount} posts</Posts>
            <FollowsButton
              count={isMe ? user.follows!.length! : followCount!}
              targetUserID={_id!}
            />
            <FollowersButton
              count={isMe ? user.followers!.length! : followerCount!}
              targetUserID={_id!}
            />
          </Row>
          <Name>{name}</Name>
          <Bio>{bio}</Bio>
        </Col>
      </Row>
    </CardCommon>
  );
}

UserInfoCard.prototype = {
  targetUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserInfoCard;
