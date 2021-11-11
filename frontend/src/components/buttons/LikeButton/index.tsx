import { useState } from 'react';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';

import { Wrapper, Button } from './style';

function LikeButton() {
  const [like, setLike] = useState(false);

  const handleClick = async () => {
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

export default LikeButton;
