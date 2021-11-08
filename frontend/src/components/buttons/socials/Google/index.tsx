import Common from 'src/components/buttons/socials/Common';
import { RiGoogleFill } from 'react-icons/ri';

import { Wrapper } from './style';

const url = process.env.NEXT_PUBLIC_SERVER_URL as string;

function Google() {
  const handleClick = () => {
    window.open(`${url}/v1/socials/google`, '_self');
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
