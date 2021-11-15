import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

import ButtonCommon from 'src/components/buttons/Common';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

interface Props {
  targetUserID: string;
  isFollower?: boolean;
}

function FollowButton({ targetUserID, isFollower }: Props) {
  const user = useRecoilValue(userAtom);
  const mutation = useMutation(() => Fetcher.putUserFollow(user, targetUserID));
  const handleClick = () => {
    mutation.mutate();
  };
  return <ButtonCommon onClick={handleClick}>{isFollower ? '맞Follow' : 'Follow'}</ButtonCommon>;
}

FollowButton.propTypes = {
  targetUserID: PropTypes.string.isRequired,
  isFollower: PropTypes.bool,
};

FollowButton.defaultProps = {
  isFollower: false,
};

export default FollowButton;
