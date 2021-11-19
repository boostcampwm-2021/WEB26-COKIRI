import { useRecoilValue } from 'recoil';
import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { IoSettingsOutline } from 'react-icons/io5';

import CardCommon from 'src/components/cards/Common';
import NavigateIconButton from 'src/components/buttons/NavigateIconButton';
import ProfileImage from 'src/components/images/ProfileImage';
import FollowSet from 'src/components/sets/FollowSet';
import { Row, Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import {
  DEFAULT_PROFILE_IMAGE,
  USER_INFO_PROFILE_IMAGE_SIZE,
  USER_INFO_CARD_WIDTH,
} from 'src/globals/constants';

import userAtom from 'src/recoil/user';

import { ImageHolder, Username } from './style';

interface Props {
  targetUser: UserType;
}

function UserInfoCard({ targetUser }: Props) {
  const user = useRecoilValue(userAtom);
  const { _id, profileImage, username, postCount, followCount, name, bio } = targetUser;
  const [followerCount, setFollowerCount] = useState(targetUser.followerCount ?? 0);

  const isMe = useMemo(() => targetUser._id === user._id, [targetUser._id, user._id]);

  const handleFollow = useCallback(() => {
    setFollowerCount((prevState) => prevState + 1);
  }, []);
  const handleUnfollow = useCallback(() => {
    setFollowerCount((prevState) => prevState - 1);
  }, []);

  return (
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
            {isMe && (
              <NavigateIconButton href={`/users/${username}/settings`}>
                <IoSettingsOutline />
              </NavigateIconButton>
            )}
            <FollowSet targetUserID={_id!} onFollow={handleFollow} onUnfollow={handleUnfollow} />
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
  );
}

UserInfoCard.prototype = {
  targetUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserInfoCard;
