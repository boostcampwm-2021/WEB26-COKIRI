import React, { Dispatch, SetStateAction, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

interface Props {
  bind?: [string | undefined, Dispatch<SetStateAction<string | undefined>>];
  placeholder?: string;
}

function Input({ bind, placeholder }: Props) {
  const state = bind![0] ?? '';
  const setState = bind![1] ?? (() => {});

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    },
    [setState],
  );

  return (
    <Wrapper>
      <input value={state} onChange={handleChange} placeholder={placeholder} />
    </Wrapper>
  );
}

Input.propTypes = {
  bind: PropTypes.arrayOf(PropTypes.any),
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  bind: ['', () => {}],
  placeholder: '',
};

export default Input;
