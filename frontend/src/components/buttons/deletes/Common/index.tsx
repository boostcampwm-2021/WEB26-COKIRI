import { useCallback, useState } from 'react';
import { UseMutationResult } from 'react-query';
import PropTypes from 'prop-types';
import { IoCloseCircleOutline } from 'react-icons/io5';

import IconButton from 'src/components/buttons/IconButton';
import DeleteModal from 'src/components/modals/DeleteModal';

import { DELETE_BUTTON_SIZE, DELETE_BUTTON_PADDING } from 'src/globals/constants';

import { Title } from './style';

interface Props {
  mutation: UseMutationResult<void, unknown, void, unknown>;
  content: string;
  hidden: boolean;
}

function DeleteCommon({ mutation, content, hidden }: Props) {
  const [isModalShow, setIsModalShow] = useState(false);

  const changeModalShow = useCallback(() => {
    setIsModalShow((prevState) => !prevState);
  }, []);

  const handleClose = useCallback(() => {
    setIsModalShow(false);
  }, []);

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <>
      {isModalShow && (
        <DeleteModal onConfirm={handleClick} onClose={handleClose}>
          <Title>{content}을 삭제하시겠습니까?</Title>
        </DeleteModal>
      )}
      <IconButton
        onClick={changeModalShow}
        hidden={hidden}
        size={DELETE_BUTTON_SIZE}
        padding={DELETE_BUTTON_PADDING}
      >
        <IoCloseCircleOutline />
      </IconButton>
    </>
  );
}

DeleteCommon.propTypes = {
  mutation: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
};

DeleteCommon.defaultProps = {
  hidden: false,
};

export default DeleteCommon;
