import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';

import IconButton from 'src/components/buttons/IconButton';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

import { LikeType } from 'src/types';

interface Props {
  postID: string;
  postLikes: LikeType[];
  onLike: VoidFunction;
  onDislike: VoidFunction;
}

function LikeButton({ postID, postLikes, onLike, onDislike }: Props) {
  const user = useRecoilValue(userAtom);

  const like = postLikes.find((postLike) => postLike.user._id === user._id);
  const [isLike, setIsLike] = useState(like !== undefined);
  const [likeID, setLikeID] = useState(like?._id ?? '');
  useEffect(() => setIsLike(like !== undefined), [like, postLikes]);
  useEffect(() => setLikeID(like?._id ?? ''), [like?._id, postLikes]);

  const postPostLike = () => Fetcher.postPostLike(user, postID);
  const deletePostLike = () => Fetcher.deletePostLike(user, postID, likeID);
  const likeMutation = useMutation(postPostLike, {
    onSuccess: (data) => setLikeID(data!._id),
  });
  const dislikeMutation = useMutation(deletePostLike);

  const handleClickLike = () => {
    likeMutation.mutate();
    onLike();
    setIsLike(true);
  };

  const handleClickDislike = () => {
    dislikeMutation.mutate();
    onDislike();
    setIsLike(false);
  };

  return isLike ? (
    <IconButton onClick={handleClickDislike} clicked title='dislike'>
      <IoHeartSharp />
    </IconButton>
  ) : (
    <IconButton onClick={handleClickLike} title='like'>
      <IoHeartOutline />
    </IconButton>
  );
}

LikeButton.propTypes = {
  postID: PropTypes.string.isRequired,
  postLikes: PropTypes.arrayOf(PropTypes.any).isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

export default LikeButton;
