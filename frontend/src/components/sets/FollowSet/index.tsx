import { useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import UnfollowButton from 'src/components/buttons/UnfollowButton';
import FollowButton from 'src/components/buttons/FollowButton';

import userAtom, { followersSelector, followsSelector } from 'src/recoil/user';

import { UserType } from 'src/types';

interface Props {
  targetUser: UserType;
  onFollow: () => void;
  onUnfollow: () => void;
}

function FollowSet({ targetUser, onFollow, onUnfollow }: Props) {
  const user = useRecoilValue(userAtom);
  const followers = useRecoilValue(followersSelector);
  const [follows, setFollows] = useRecoilState<string[]>(followsSelector);

  const isMe = useMemo(() => targetUser._id === user._id, [targetUser._id, user._id]);
  const isFollower = useMemo(
    () => followers?.includes(targetUser._id!),
    [targetUser._id, followers],
  );
  const isFollow = useMemo(() => follows?.includes(targetUser._id!), [targetUser._id, follows]);

  const handleFollow = useCallback(() => {
    setFollows((prevState) => [...prevState, targetUser._id!]);
    onFollow();
  }, [onFollow, setFollows, targetUser._id]);

  const handleUnfollow = useCallback(() => {
    setFollows((prevState) => prevState.filter((id) => id !== targetUser._id));
    onUnfollow();
  }, [onUnfollow, setFollows, targetUser._id]);
  if (isMe) {
    return '';
  }
  return isFollow ? (
    <UnfollowButton targetUserID={targetUser._id!} onUnfollow={handleUnfollow} />
  ) : (
    <FollowButton isFollower={isFollower!} targetUserID={targetUser._id!} onFollow={handleFollow} />
  );
}

FollowSet.propTypes = {
  targetUser: PropTypes.objectOf(PropTypes.any).isRequired,
  onFollow: PropTypes.func,
  onUnfollow: PropTypes.func,
};

FollowSet.defaultProps = {
  onFollow: () => {},
  onUnfollow: () => {},
};

export default FollowSet;
