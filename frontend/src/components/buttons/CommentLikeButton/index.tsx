import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';

import IconButton from 'src/components/buttons/IconButton';

import { Fetcher } from 'src/utils';

import userAtom, { isAuthenticatedSelector } from 'src/recoil/user';

import { LikeType } from 'src/types';

import { COMMENT_LIKE_BUTTON_SIZE, COMMENT_LIKE_BUTTON_PADDING } from 'src/globals/constants';

interface Props {
  postID: string;
  commentID: string;
  commentLikes: LikeType[];
  margin?: number;
}

function CommentLikeButton({ postID, commentID, commentLikes, margin }: Props) {
  const user = useRecoilValue(userAtom);
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

  const myLike = commentLikes.find((commentLike) => commentLike.user._id === user._id);
  const [isLike, setIsLike] = useState(myLike !== undefined);
  const [likeID, setLikeID] = useState(myLike !== undefined ? myLike._id : '');
  const [likeCount, setLikeCount] = useState(commentLikes.length);

  const postCommentLike = () => Fetcher.postCommentLike(user, postID, commentID);
  const deleteCommentLike = () => Fetcher.deleteCommentLike(user, postID, commentID, likeID);
  const likeMutation = useMutation(postCommentLike, {
    onSuccess: ({ data }) => {
      setLikeCount((prevState) => prevState + 1);
      setIsLike(true);
      setLikeID(data!._id);
    },
  });
  const dislikeMutation = useMutation(deleteCommentLike, {
    onSuccess: () => {
      setLikeCount((prevState) => prevState - 1);
      setIsLike(false);
    },
  });

  return isLike ? (
    <IconButton
      onClick={() => dislikeMutation.mutate()}
      size={COMMENT_LIKE_BUTTON_SIZE}
      padding={COMMENT_LIKE_BUTTON_PADDING}
      margin={margin}
      clicked
      title='dislike'
    >
      <IoHeartSharp />
      {likeCount !== 0 && likeCount}
    </IconButton>
  ) : (
    <IconButton
      onClick={() => likeMutation.mutate()}
      size={COMMENT_LIKE_BUTTON_SIZE}
      padding={COMMENT_LIKE_BUTTON_PADDING}
      margin={margin}
      disabled={!isAuthenticated}
      title='like'
    >
      <IoHeartOutline />
      {likeCount !== 0 && likeCount}
    </IconButton>
  );
}

CommentLikeButton.propTypes = {
  postID: PropTypes.string.isRequired,
  commentLikes: PropTypes.arrayOf(PropTypes.any).isRequired,
  margin: PropTypes.number,
};

CommentLikeButton.defaultProps = {
  margin: 0,
};

export default CommentLikeButton;
