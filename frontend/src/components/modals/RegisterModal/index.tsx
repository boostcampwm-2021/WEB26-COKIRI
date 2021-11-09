import React, { useState } from 'react';
import { useMutation } from 'react-query';

import Modal from 'src/components/modals/Common';
import { Col } from 'src/components/Grid';

import { Fetcher } from 'src/utils';
import userAtom from 'src/recoil/user';
import { useRecoilValue } from 'recoil';

function RegisterModal() {
  const [username, setUsername] = useState('');
  const user = useRecoilValue(userAtom);
  // eslint-disable-next-line no-underscore-dangle
  const mutation = useMutation(() => Fetcher.setUsername(username, user._id));

  const handleOnClose = () => {};

  const handleOnConfirm = () => {
    mutation.mutate();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <Modal onConfirm={handleOnConfirm} onClose={handleOnClose} close='로그아웃' confirm='확인'>
      <Col>
        <p>회원가입에 필요한 절차에요</p>
        <p>username을 알려주세요~</p>
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <input value={username} onChange={handleInputChange} autoFocus type='text' />
      </Col>
    </Modal>
  );
}

export default RegisterModal;
