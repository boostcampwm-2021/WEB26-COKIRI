import { IoSearchSharp } from 'react-icons/io5';

import { Wrapper } from './style';

function SearchBox() {
  return (
    <Wrapper>
      <input type='text' placeholder='search' />
      <IoSearchSharp size='20' />
    </Wrapper>
  );
}

export default SearchBox;
