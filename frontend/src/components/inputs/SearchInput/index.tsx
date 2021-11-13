import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

import Input from 'src/components/inputs/Common';

import { Wrapper } from './style';

function SearchInput() {
  const [value, setValue] = useState('');
  return (
    <Wrapper>
      <Input bind={[value, setValue]} placeholder='search' width={136} />
      <IoSearchSharp />
    </Wrapper>
  );
}

export default SearchInput;
