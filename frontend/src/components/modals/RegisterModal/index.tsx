import React, { useCallback, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';

import Modal from 'src/components/modals/Common';
import { Col } from 'src/components/Grid';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

function RegisterModal() {
  const [user, setUser] = useRecoilState(userAtom);
  const [username, setUsername] = useState('');
  const isModalShow = useMemo(() => user.isRegistered === false, [user]);
  const putUsersUsername = () => Fetcher.putUsersUsername(username, user);
  const mutation = useMutation(putUsersUsername, {
    onSuccess: () => setUser({ ...user, isRegistered: true }),
  });
  const handleOnConfirm = () => mutation.mutate();
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }, []);
  return (
    <>
      {isModalShow && (
        <Modal onConfirm={handleOnConfirm} close='로그아웃' confirm='확인'>
          <Col>
            <p>회원가입에 필요한 절차에요</p>
            <p>username을 알려주세요~</p>
            <input value={username} onChange={handleInputChange} type='text' />
          </Col>
        </Modal>
      )}
    </>
  );
}

export default RegisterModal;
