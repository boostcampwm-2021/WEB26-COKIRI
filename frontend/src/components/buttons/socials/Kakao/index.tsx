import { RiKakaoTalkFill } from 'react-icons/ri';

import SocialCommon from 'src/components/buttons/socials/Common';

const url = process.env.NEXT_PUBLIC_SERVER_URL as string;

function Kakao() {
  const handleClick = () => {
    window.open(`${url}/v1/socials/kakao`, '_self');
  };

  return (
    <SocialCommon onClick={handleClick}>
      <RiKakaoTalkFill />
    </SocialCommon>
  );
}

export default Kakao;
