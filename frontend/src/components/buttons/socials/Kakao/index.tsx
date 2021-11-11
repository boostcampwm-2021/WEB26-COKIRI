import { RiKakaoTalkFill } from 'react-icons/ri';

import Social from 'src/components/buttons/socials/Common';

const url = process.env.NEXT_PUBLIC_SERVER_URL as string;

function Kakao() {
  const handleClick = () => {
    window.open(`${url}/v1/socials/google`, '_self');
  };

  return (
    <Social onClick={handleClick}>
      <RiKakaoTalkFill />
    </Social>
  );
}

export default Kakao;
