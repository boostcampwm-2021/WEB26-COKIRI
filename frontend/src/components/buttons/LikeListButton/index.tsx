import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';

import LikeListModal from 'src/components/modals/LikeListModal';

import { Wrapper, Button } from './style';

interface Props {
  length: string;
}

function LikeListButton({ length }: Props) {
  const [isLikeListModal, setIsLikeListModal] = useState(false);
  const changeModalState = useCallback(() => {
    setIsLikeListModal((prevState) => !prevState);
  }, []);

  return (
    <Wrapper>
      <Button onClick={changeModalState}>좋아요 {length}개</Button>
      {isLikeListModal && <LikeListModal onClose={changeModalState} />}
    </Wrapper>
  );
}

LikeListButton.propsType = {
  length: PropTypes.string.isRequired,
};
export default LikeListButton;
