import React, { useCallback, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';

import ModalCommon from 'src/components/modals/Common';
import InputCommon from 'src/components/inputs/Common';

import { Col } from 'src/components/Grid';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

function RegisterModal() {
  const [user, setUser] = useRecoilState(userAtom);
  const [username, setUsername] = useState('');
  const isModalShow = useMemo(() => user.isRegistered === false, [user]);

  const putUserSettings = () => Fetcher.putUserSettings(user, { username });
  const mutation = useMutation(putUserSettings, {
    onSuccess: () => setUser({ ...user, isRegistered: true, username }),
  });
  const handleOnConfirm = useCallback(() => mutation.mutate(), [mutation]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isModalShow && (
        <ModalCommon onConfirm={handleOnConfirm} close='로그아웃' confirm='확인'>
          <Col alignItems='center'>
            <p>회원가입에 필요한 절차에요</p>
            <p>username을 알려주세요~</p>
            <InputCommon bind={[username, setUsername]} />
          </Col>
        </ModalCommon>
      )}
    </>
  );
}

export default RegisterModal;
