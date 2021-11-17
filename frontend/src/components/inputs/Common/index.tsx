import React, { Dispatch, ReactNode, SetStateAction, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Input } from './style';

interface Props {
  bind: [string, Dispatch<SetStateAction<string>>];
  placeholder?: string;
  width?: number;
  icon?: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onChange?: (state: string) => void;
}

function InputCommon({ bind, placeholder, width, icon, onChange }: Props) {
  const [state, setState] = bind;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newState = event.target.value;
      setState(newState);
      onChange!(newState);
    },
    [onChange, setState],
  );

  return (
    <Wrapper width={width!}>
      <Input width={width!} value={state} onChange={handleChange} placeholder={placeholder} />
      {icon}
    </Wrapper>
  );
}

InputCommon.propTypes = {
  bind: PropTypes.arrayOf(PropTypes.any).isRequired,
  placeholder: PropTypes.string,
  width: PropTypes.number,
  icon: PropTypes.node,
  onChange: PropTypes.func,
};

InputCommon.defaultProps = {
  placeholder: '',
  width: 0,
  icon: '',
  onChange: () => {},
};

export default InputCommon;
