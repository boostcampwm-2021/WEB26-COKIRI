import { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import PropTypes from 'prop-types';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

import { PostType } from 'src/types';

import { Wrapper, Button } from './style';

interface Props {
  post: PostType;
  setLikeCount: Dispatch<SetStateAction<number>>;
}

function LikeButton({ post, setLikeCount }: Props) {
  const user = useRecoilValue(userAtom);
  const [like, setLike] = useState(post.likes.some((postLike) => postLike._id === user._id));

  const handleClick = async () => {
    if (like) {
      await Fetcher.deletePostLike(user, post);
      setLikeCount((prevState) => prevState - 1);
    } else {
      await Fetcher.postPostLike(user, post);
      setLikeCount((prevState) => prevState + 1);
    }
    setLike((prevState) => !prevState);
  };

  return (
    <Wrapper>
      <Button onClick={handleClick}>
        {like ? <IoHeartSharp size='24' /> : <IoHeartOutline size='24' />}
      </Button>
    </Wrapper>
  );
}

LikeButton.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  setLikeCount: PropTypes.func.isRequired,
};

export default LikeButton;
