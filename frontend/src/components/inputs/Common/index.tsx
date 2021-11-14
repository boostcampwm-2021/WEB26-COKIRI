import React, { Dispatch, SetStateAction, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

interface Props {
  bind: [string, Dispatch<SetStateAction<string>>];
  placeholder?: string;
  width?: number;
}

function Input({ bind, placeholder, width }: Props) {
  const [state, setState] = bind;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    },
    [setState],
  );

  return (
    <Wrapper width={width!}>
      <input value={state} onChange={handleChange} placeholder={placeholder} />
    </Wrapper>
  );
}

Input.propTypes = {
  bind: PropTypes.arrayOf(PropTypes.any).isRequired,
  placeholder: PropTypes.string,
  width: PropTypes.number,
};

Input.defaultProps = {
  placeholder: '',
  width: 0,
};

export default Input;
