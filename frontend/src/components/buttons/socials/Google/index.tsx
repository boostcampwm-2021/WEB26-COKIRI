import Common from 'src/components/buttons/socials/Common';

import { RiGoogleFill } from 'react-icons/ri';
import { Wrapper } from './style';

function Google() {
  const handleClick = () => {
    console.log('test');
  };

  return (
    <Wrapper>
      <Common onClick={handleClick}>
        <RiGoogleFill />
      </Common>
    </Wrapper>
  );
}

export default Google;
