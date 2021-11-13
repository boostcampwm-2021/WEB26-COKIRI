import { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

import { PostType } from 'src/types';

import IconButton from 'src/components/buttons/IconButton';

interface Props {
  post: PostType;
  setLikeCount: Dispatch<SetStateAction<number>>;
}

function LikeButton({ post, setLikeCount }: Props) {
  const user = useRecoilValue(userAtom);
  const [isLike, setIsLike] = useState(post.likes.some((postLike) => postLike._id === user._id));
  const likeMutation = useMutation(() => Fetcher.postPostLike(user, post));
  const dislikeMutation = useMutation(() => Fetcher.deletePostLike(user, post));

  const handleClickLike = () => {
    likeMutation.mutate();
    setLikeCount((prevState) => prevState - 1);
    setIsLike(true);
  };

  const handleClickDislike = () => {
    dislikeMutation.mutate();
    setLikeCount((prevState) => prevState - 1);
    setIsLike(false);
  };

  return isLike ? (
    <IconButton onClick={handleClickLike}>
      <IoHeartSharp />
    </IconButton>
  ) : (
    <IconButton onClick={handleClickDislike}>
      <IoHeartOutline />
    </IconButton>
  );
}

LikeButton.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  setLikeCount: PropTypes.func.isRequired,
};

export default LikeButton;
