import { BiSearch } from 'react-icons/bi';

import { Wrapper } from './style';
function SearchBox() {
  return (
    <Wrapper>
      <input type='text' placeholder='search' />
      <BiSearch size='20' />
    </Wrapper>
  );
}

export default SearchBox;
