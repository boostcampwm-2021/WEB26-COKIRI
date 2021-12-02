import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

import ButtonCommon from 'src/components/buttons/Common';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

interface Props {
  targetUserID: string;
  onUnfollow: VoidFunction;
}

function UnfollowButton({ targetUserID, onUnfollow }: Props) {
  const user = useRecoilValue(userAtom);
  const mutation = useMutation(() => Fetcher.deleteUserFollow(user, targetUserID), {
    onSuccess: () => {
      onUnfollow();
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <ButtonCommon onClick={handleClick} red title='unfollow'>
      언팔
    </ButtonCommon>
  );
}

UnfollowButton.propTypes = {
  targetUserID: PropTypes.string.isRequired,
  onUnfollow: PropTypes.func,
};

UnfollowButton.defaultProps = {
  onUnfollow: () => {},
};

export default UnfollowButton;
