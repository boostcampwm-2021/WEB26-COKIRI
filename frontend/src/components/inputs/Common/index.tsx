import React, { Dispatch, ReactNode, SetStateAction, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDebounce } from 'src/hooks';

import { DEFAULT_DEBOUNCE_TIME } from 'src/globals/constants';

import { Wrapper, Input } from './style';

interface Props {
  title: string;
  bind: [string, Dispatch<SetStateAction<string>>];
  placeholder: string;
  width: number;
  icon: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onChange: (state: string) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeWithDebounce: (state: string) => void;
}

function InputCommon({
  title,
  bind,
  placeholder,
  width,
  icon,
  onChange,
  onChangeWithDebounce,
}: Props) {
  const [state, setState] = bind;
  useDebounce(() => onChangeWithDebounce(state), DEFAULT_DEBOUNCE_TIME, [state]);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newState = event.target.value;
      setState(newState);
      onChange(newState);
    },
    [onChange, setState],
  );

  return (
    <Wrapper width={width}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={title}>label</label>
      <Input
        id={title}
        type='text'
        width={width}
        value={state}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete='off'
        spellCheck={false}
      />
      {icon}
    </Wrapper>
  );
}

InputCommon.propTypes = {
  title: PropTypes.string.isRequired,
  bind: PropTypes.arrayOf(PropTypes.any).isRequired,
  placeholder: PropTypes.string,
  width: PropTypes.number,
  icon: PropTypes.node,
  onChange: PropTypes.func,
  onChangeWithDebounce: PropTypes.func,
};

InputCommon.defaultProps = {
  placeholder: '',
  width: 0,
  icon: '',
  onChange: () => {},
  onChangeWithDebounce: () => {},
};

export default InputCommon;
