import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import ModalCommon from 'src/components/modals/Common';
import InputCommon from 'src/components/inputs/Common';
import { Col } from 'src/components/Grid';

import { Fetcher } from 'src/utils';

import userAtom, { isRegisteredSelector } from 'src/recoil/user';

function RegisterModal() {
  const [user, setUser] = useRecoilState(userAtom);
  const isRegistered = useRecoilValue(isRegisteredSelector);
  const [username, setUsername] = useState('');
  const putUserSettings = () => Fetcher.putUserSettings(user, { username });
  const mutation = useMutation(putUserSettings, {
    onSuccess: () => setUser({ ...user, isRegistered: true, username }),
  });
  const handleOnConfirm = useCallback(() => mutation.mutate(), [mutation]);

  if (isRegistered) {
    return null;
  }
  return (
    <ModalCommon onConfirm={handleOnConfirm} close='로그아웃' confirm='확인'>
      <Col alignItems='center'>
        <p>회원가입에 필요한 절차에요</p>
        <p>username을 알려주세요~</p>
        <InputCommon bind={[username, setUsername]} />
      </Col>
    </ModalCommon>
  );
}

export default RegisterModal;
