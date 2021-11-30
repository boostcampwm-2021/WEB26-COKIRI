import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import UnfollowButton from 'src/components/buttons/UnfollowButton';
import FollowButton from 'src/components/buttons/FollowButton';

import userAtom, {
  followersSelector,
  followsSelector,
  isAuthenticatedSelector,
} from 'src/recoil/user';

interface Props {
  targetUserID: string;
  onFollow: VoidFunction;
  onUnfollow: VoidFunction;
}

function FollowSet({ targetUserID, onFollow, onUnfollow }: Props) {
  const user = useRecoilValue(userAtom);
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const followers = useRecoilValue(followersSelector);
  const [follows, setFollows] = useRecoilState<string[]>(followsSelector);

  const isMe = targetUserID === user._id;
  const isFollower = followers?.includes(targetUserID!);
  const isFollow = follows?.includes(targetUserID!);

  const handleFollow = useCallback(() => {
    setFollows((prevState) => [...prevState, targetUserID!]);
    onFollow();
  }, [onFollow, setFollows, targetUserID]);

  const handleUnfollow = useCallback(() => {
    setFollows((prevState) => prevState.filter((id) => id !== targetUserID));
    onUnfollow();
  }, [onUnfollow, setFollows, targetUserID]);

  if (isMe || !isAuthenticated) {
    return null;
  }

  return isFollow ? (
    <UnfollowButton targetUserID={targetUserID} onUnfollow={handleUnfollow} />
  ) : (
    <FollowButton isFollower={isFollower} targetUserID={targetUserID} onFollow={handleFollow} />
  );
}

FollowSet.propTypes = {
  targetUserID: PropTypes.string.isRequired,
  onFollow: PropTypes.func,
  onUnfollow: PropTypes.func,
};

FollowSet.defaultProps = {
  onFollow: () => {},
  onUnfollow: () => {},
};

export default FollowSet;
