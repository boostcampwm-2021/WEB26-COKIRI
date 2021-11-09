import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import Modal from 'src/components/modals/Common';
import { Col } from 'src/components/Grid';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

interface Props {
  onClose: () => void;
}

function RegisterModal({ onClose }: Props) {
  const [username, setUsername] = useState('');
  const user = useRecoilValue(userAtom);
  const putUsersUsername = () => Fetcher.putUsersUsername(username, user);
  const mutation = useMutation(putUsersUsername, {
    onSuccess: () => onClose(),
  });
  const handleOnConfirm = () => mutation.mutate();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  return (
    <Modal onConfirm={handleOnConfirm} close='로그아웃' confirm='확인'>
      <Col>
        <p>회원가입에 필요한 절차에요</p>
        <p>username을 알려주세요~</p>
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <input value={username} onChange={handleInputChange} autoFocus type='text' />
      </Col>
    </Modal>
  );
}

RegisterModal.propTypes = {
  onClose: PropTypes.func,
};

RegisterModal.defaultProps = {
  onClose: () => {},
};

export default RegisterModal;
