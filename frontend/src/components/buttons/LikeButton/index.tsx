import { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';

import IconButton from 'src/components/buttons/IconButton';
import SigninModal from 'src/components/modals/SigninModal';

import { Fetcher } from 'src/utils';

import userAtom, { isAuthenticatedSelector } from 'src/recoil/user';

import { LikeType } from 'src/types';

interface Props {
  postID: string;
  postLikes: LikeType[];
  setLikeCount: Dispatch<SetStateAction<number>>;
}

function LikeButton({ postID, postLikes, setLikeCount }: Props) {
  const user = useRecoilValue(userAtom);
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

  const [isModalShow, setIsModalShow] = useState(false);
  const like = postLikes.find((postLike) => postLike.user._id === user._id);
  const [isLike, setIsLike] = useState(like !== undefined);
  const [likeID, setLikeID] = useState(like?._id ?? '');
  const postPostLike = () => Fetcher.postPostLike(user, postID);
  const deletePostLike = () => Fetcher.deletePostLike(user, postID, likeID);
  const likeMutation = useMutation(postPostLike, {
    onSuccess: ({ data }) => setLikeID(data!._id),
  });
  const dislikeMutation = useMutation(deletePostLike);

  const handleClickLike = () => {
    if (!isAuthenticated) {
      setIsModalShow(true);
      return;
    }
    likeMutation.mutate();
    setLikeCount((prevState) => prevState + 1);
    setIsLike(true);
  };

  const handleClickDislike = () => {
    dislikeMutation.mutate();
    setLikeCount((prevState) => prevState - 1);
    setIsLike(false);
  };

  const handleModalClose = () => {
    setIsModalShow(false);
  };

  return (
    <>
      {isModalShow && <SigninModal onClose={handleModalClose} />}
      {isLike ? (
        <IconButton onClick={handleClickDislike}>
          <IoHeartSharp />
        </IconButton>
      ) : (
        <IconButton onClick={handleClickLike}>
          <IoHeartOutline />
        </IconButton>
      )}
    </>
  );
}

LikeButton.propTypes = {
  postID: PropTypes.string.isRequired,
  postLikes: PropTypes.arrayOf(PropTypes.any).isRequired,
  setLikeCount: PropTypes.func.isRequired,
};

export default LikeButton;
