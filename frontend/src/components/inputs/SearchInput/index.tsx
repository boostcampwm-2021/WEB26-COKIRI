import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

import InputCommon from 'src/components/inputs/Common';

import { SEARCH_INPUT_WIDTH } from 'src/globals/constants';

import { Wrapper } from './style';

function SearchInput() {
  const [value, setValue] = useState('');
  return (
    <Wrapper>
      <InputCommon bind={[value, setValue]} placeholder='search' width={SEARCH_INPUT_WIDTH} />
      <IoSearchSharp />
    </Wrapper>
  );
}

export default SearchInput;
