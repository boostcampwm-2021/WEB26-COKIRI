import React, { Dispatch, ReactNode, SetStateAction, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Input } from './style';

interface Props {
  bind?: [string, Dispatch<SetStateAction<string>>];
  placeholder?: string;
  width?: number;
  icon?: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onChange?: (state: string) => void;
}

function InputCommon({ bind, placeholder, width, icon, onChange }: Props) {
  const [state, setState] = bind!;
  const [fallbackState, setFallbackState] = useState('');

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
      setFallbackState(event.target.value);
      onChange!(event.target.value);
    },
    [onChange, setState],
  );

  return (
    <Wrapper width={width!}>
      <Input
        width={width!}
        value={state || fallbackState}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {icon}
    </Wrapper>
  );
}

InputCommon.propTypes = {
  bind: PropTypes.arrayOf(PropTypes.any),
  placeholder: PropTypes.string,
  width: PropTypes.number,
  icon: PropTypes.node,
  onChange: PropTypes.func,
};

InputCommon.defaultProps = {
  bind: ['', () => {}],
  placeholder: '',
  width: 0,
  icon: '',
  onChange: () => {},
};

export default InputCommon;
