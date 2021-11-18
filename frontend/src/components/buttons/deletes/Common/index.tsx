import { useCallback, useState } from 'react';
import { UseMutationResult } from 'react-query';
import PropTypes from 'prop-types';

import ButtonCommon from 'src/components/buttons/Common';
import DeleteModal from 'src/components/modals/DeleteModal';

import { Title } from './style';

interface Props {
  mutation: UseMutationResult<void, unknown, void, unknown>;
  content: string;
}

function DeleteCommon({ mutation, content }: Props) {
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
      <ButtonCommon onClick={changeModalShow}>삭제</ButtonCommon>
    </>
  );
}

DeleteCommon.propTypes = {
  mutation: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default DeleteCommon;
