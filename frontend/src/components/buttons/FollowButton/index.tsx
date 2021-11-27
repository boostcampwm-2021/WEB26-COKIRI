import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

import ButtonCommon from 'src/components/buttons/Common';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

interface Props {
  targetUserID: string;
  isFollower?: boolean;
  onFollow: () => void;
}

function FollowButton({ targetUserID, isFollower, onFollow }: Props) {
  const user = useRecoilValue(userAtom);
  const mutation = useMutation(() => Fetcher.putUserFollow(user, targetUserID), {
    onSuccess: () => {
      onFollow();
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <ButtonCommon onClick={handleClick} green>
      {isFollower ? '맞팔' : '팔로'}
    </ButtonCommon>
  );
}

FollowButton.propTypes = {
  targetUserID: PropTypes.string.isRequired,
  isFollower: PropTypes.bool,
  onFollow: PropTypes.func,
};

FollowButton.defaultProps = {
  isFollower: false,
  onFollow: () => {},
};

export default FollowButton;
