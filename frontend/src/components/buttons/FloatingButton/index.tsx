import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import ButtonCommon from 'src/components/buttons/Common';
import PostWriteModal from 'src/components/modals/PostWriteModal';

import { FLOATING_BUTTON_WIDTH, FLOATING_BUTTON_HEIGHT } from 'src/globals/constants';

import { Wrapper } from './style';

interface Props {
  onPostWrite?: VoidFunction;
}

function FloatingButton({ onPostWrite }: Props) {
  const [isModalShow, setIsModalShow] = useState(false);

  const changeModalShow = useCallback(() => {
    setIsModalShow((prevState) => !prevState);
  }, []);

  const handleClose = useCallback(() => {
    setIsModalShow(false);
  }, []);

  const handlePostWrite = () => {
    setIsModalShow(false);
    onPostWrite!();
  };

  return (
    <Wrapper>
      {isModalShow && <PostWriteModal onClose={handleClose} onPostWrite={handlePostWrite} />}
      <ButtonCommon
        onClick={changeModalShow}
        width={FLOATING_BUTTON_WIDTH}
        height={FLOATING_BUTTON_HEIGHT}
      >
        작성
      </ButtonCommon>
    </Wrapper>
  );
}

FloatingButton.prototype = {
  onPostWrite: PropTypes.func,
};

FloatingButton.defaultProps = {
  onPostWrite: () => {},
};

export default FloatingButton;
