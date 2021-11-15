import React, { Dispatch, ReactNode, SetStateAction, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Input } from './style';

interface Props {
  bind: [string, Dispatch<SetStateAction<string>>];
  placeholder?: string;
  width?: number;
  icon?: ReactNode;
}

function InputCommon({ bind, placeholder, width, icon }: Props) {
  const [state, setState] = bind;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    },
    [setState],
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
};

InputCommon.defaultProps = {
  placeholder: '',
  width: 0,
  icon: '',
};

export default InputCommon;
