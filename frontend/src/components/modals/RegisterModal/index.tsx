import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AiOutlineCheck } from 'react-icons/ai';

import ModalCommon from 'src/components/modals/Common';
import InputCommon from 'src/components/inputs/Common';
import { Col } from 'src/components/Grid';

import { Fetcher } from 'src/utils';

import userAtom, { isAuthenticatedSelector, isRegisteredSelector } from 'src/recoil/user';

const validateUsername = (username: string) => /^[a-zA-Z0-9_-]{1,20}/.test(username);

function RegisterModal() {
  const [user, setUser] = useRecoilState(userAtom);
  const isRegistered = useRecoilValue(isRegisteredSelector);
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState(false);

  const mutation = useMutation(() => Fetcher.putUserSettings(user, { username }), {
    onSuccess: () => setUser({ ...user, isRegistered: true, username }),
  });
  const validateMutation = useMutation(
    (newUsername: string) => Fetcher.getIsExistUsername(newUsername),
    { onSuccess: (data) => setIsValid(!data) },
  );

  const handleConfirm = useCallback(() => mutation.mutate(), [mutation]);
  if (!isAuthenticated || isRegistered) {
    return null;
  }

  const handleChange = (value: string) => {
    if (validateUsername(value)) {
      validateMutation.mutate(value);
    } else {
      setIsValid(false);
    }
  };
  return (
    <ModalCommon
      onConfirm={handleConfirm}
      close='로그아웃'
      confirm='확인'
      title='username 입력'
      disabled={!isValid}
    >
      <Col alignItems='center'>
        <p>영문 대소문자 및 숫자만 가능해요</p>
        <InputCommon
          bind={[username, setUsername]}
          onChangeWithDebounce={handleChange}
          icon={isValid ? <AiOutlineCheck /> : null}
        />
      </Col>
    </ModalCommon>
  );
}

export default RegisterModal;
