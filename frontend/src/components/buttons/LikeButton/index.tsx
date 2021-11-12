import { useState } from 'react';
import PropTypes from 'prop-types';
// import { useRecoilValue } from 'recoil';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';

// import { Fetcher } from 'src/utils';

// import userAtom from 'src/recoil/user';

import { PostType } from 'src/types';

import { Wrapper, Button } from './style';

interface Props {
  post: PostType;
}

function LikeButton({ post }: Props) {
  // const user = useRecoilValue(userAtom);
  // const [like, setLike] = useState(post.likes.some((postLike) => postLike.userID === user._id));
  // const [likeID, setLikeID] = useState({ _id: 0 });
  const [like, setLike] = useState(false);

  const handleClick = async () => {
    // if (like) {
    //   await Fetcher.postPostUnlike(user, post, likeID);
    // } else {
    //   setLikeID(await Fetcher.postPostLike(user, post));
    // }
    setLike((prevState) => !prevState);
  };

  return (
    <Wrapper>
      <Button onClick={handleClick} like={like}>
        {like ? <IoHeartSharp size='24' /> : <IoHeartOutline size='24' />}
      </Button>
    </Wrapper>
  );
}

LikeButton.propsType = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LikeButton;
