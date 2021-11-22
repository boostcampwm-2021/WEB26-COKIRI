import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { IoCloseCircleOutline } from 'react-icons/io5';

import IconButton from 'src/components/buttons/IconButton';
import DeleteModal from 'src/components/modals/DeleteModal';

import { DELETE_BUTTON_SIZE, DELETE_BUTTON_PADDING } from 'src/globals/constants';

import { Title } from './style';

interface Props {
  onClick: () => void;
  content: string;
}

function DeleteCommon({ onClick, content }: Props) {
  const [isModalShow, setIsModalShow] = useState(false);

  const changeModalShow = useCallback(() => {
    setIsModalShow((prevState) => !prevState);
  }, []);

  const handleClose = useCallback(() => {
    setIsModalShow(false);
  }, []);

  return (
    <>
      {isModalShow && (
        <DeleteModal onConfirm={onClick} onClose={handleClose}>
          <Title>{content}을 삭제하시겠습니까?</Title>
        </DeleteModal>
      )}
      <IconButton
        onClick={changeModalShow}
        size={DELETE_BUTTON_SIZE}
        padding={DELETE_BUTTON_PADDING}
      >
        <IoCloseCircleOutline />
      </IconButton>
    </>
  );
}

DeleteCommon.propTypes = {
  onClick: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

DeleteCommon.defaultProps = {
  hidden: false,
};

export default DeleteCommon;
