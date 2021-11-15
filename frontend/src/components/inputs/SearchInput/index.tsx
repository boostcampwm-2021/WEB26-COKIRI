import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

import InputCommon from 'src/components/inputs/Common';

import { SEARCH_INPUT_WIDTH } from 'src/globals/constants';

function SearchInput() {
  const [value, setValue] = useState('');
  return (
    <InputCommon
      bind={[value, setValue]}
      placeholder='search'
      width={SEARCH_INPUT_WIDTH}
      icon={<IoSearchSharp />}
    />
  );
}

export default SearchInput;
