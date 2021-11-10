import { useCallback, useState } from 'react';

import PostWriteModal from 'src/components/modals/PostWriteModal';

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
      {isModalShow && <PostWriteModal onClose={handleClose} />}
      <Button onClick={changeModalShow}>작성</Button>
    </Wrapper>
  );
}

export default FloatingButton;
