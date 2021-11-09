import { useCallback, useState } from 'react';

import PostModal from 'src/components/modals/PostModal';

import { Wrapper, Button } from './style';

function FloatingButton() {
  const [isModalShow, setIsModalShow] = useState(false);

  const changeModalShow = useCallback(() => {
    setIsModalShow((prevState) => !prevState);
  }, []);

  const handleClose = useCallback(() => {
    setIsModalShow(false);
  }, []);

  return (
    <Wrapper>
      {isModalShow && <PostModal onClose={handleClose} />}
      <Button onClick={changeModalShow}>작성</Button>
    </Wrapper>
  );
}

export default FloatingButton;
