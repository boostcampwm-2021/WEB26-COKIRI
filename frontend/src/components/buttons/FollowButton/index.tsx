import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

import Button from 'src/components/buttons/Common';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

interface Props {
  targetUserID: string;
}

function FollowButton({ targetUserID }: Props) {
  const user = useRecoilValue(userAtom);
  const mutation = useMutation(() => Fetcher.putUserFollow(user, targetUserID));
  const handleClick = () => {
    mutation.mutate();
  };
  return <Button onClick={handleClick}>팔로우</Button>;
}

FollowButton.propTypes = {
  targetUserID: PropTypes.string.isRequired,
};

export default FollowButton;
