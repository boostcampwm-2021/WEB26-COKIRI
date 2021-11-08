import Common from 'src/components/buttons/socials/Common';
import { RiKakaoTalkFill } from 'react-icons/ri';

import { Wrapper } from './style';

const url = process.env.NEXT_PUBLIC_SERVER_URL as string;

function Kakao() {
  const handleClick = () => {
    window.open(`${url}/v1/socials/google`, '_self');
  };

  return (
    <Wrapper>
      <Common onClick={handleClick}>
        <RiKakaoTalkFill />
      </Common>
    </Wrapper>
  );
}

export default Kakao;
