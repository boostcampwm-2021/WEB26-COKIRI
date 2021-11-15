import { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

import { LikeType } from 'src/types';

import {
  COMMENT_LIKE_BUTTON_WIDTH,
  COMMENT_LIKE_BUTTON_HEIGHT,
  COMMENT_LIKE_BUTTON_SIZE,
  COMMENT_LIKE_BUTTON_PADDING,
} from 'src/globals/constants';

import IconButton from 'src/components/buttons/IconButton';

interface Props {
  postID: string;
  commentID: string;
  commentLikes: LikeType[];
  setLikeCount: Dispatch<SetStateAction<number>>;
}

function CommentLikeButton({ postID, commentID, commentLikes, setLikeCount }: Props) {
  const user = useRecoilValue(userAtom);
  const like = commentLikes.find((commentLike) => commentLike.user._id === user._id);
  const [isLike, setIsLike] = useState(like !== undefined);
  const [likeID, setLikeID] = useState(like !== undefined ? like._id : '');
  const postCommentLike = () => Fetcher.postCommentLike(user, postID, commentID);
  const deleteCommentLike = () => Fetcher.deleteCommentLike(user, postID, commentID, likeID);
  const likeMutation = useMutation(postCommentLike, {
    onSuccess: (data) => setLikeID(data.result._id),
  });
  const dislikeMutation = useMutation(deleteCommentLike);

  const handleClickLike = () => {
    likeMutation.mutate();
    setLikeCount((prevState) => prevState + 1);
    setIsLike(true);
  };

  const handleClickDislike = () => {
    dislikeMutation.mutate();
    setLikeCount((prevState) => prevState - 1);
    setIsLike(false);
  };

  return isLike ? (
    <IconButton
      onClick={handleClickDislike}
      plain
      width={COMMENT_LIKE_BUTTON_WIDTH}
      height={COMMENT_LIKE_BUTTON_HEIGHT}
      size={COMMENT_LIKE_BUTTON_SIZE}
      padding={COMMENT_LIKE_BUTTON_PADDING}
    >
      <IoHeartSharp />
    </IconButton>
  ) : (
    <IconButton
      onClick={handleClickLike}
      plain
      width={COMMENT_LIKE_BUTTON_WIDTH}
      height={COMMENT_LIKE_BUTTON_HEIGHT}
      size={COMMENT_LIKE_BUTTON_SIZE}
      padding={COMMENT_LIKE_BUTTON_PADDING}
    >
      <IoHeartOutline />
    </IconButton>
  );
}

CommentLikeButton.propTypes = {
  postID: PropTypes.string.isRequired,
  commentLikes: PropTypes.arrayOf(PropTypes.any).isRequired,
  setLikeCount: PropTypes.func.isRequired,
};

export default CommentLikeButton;
