import Common from 'src/components/buttons/socials/Common';
import { RiKakaoTalkFill } from 'react-icons/ri';

const url = process.env.NEXT_PUBLIC_SERVER_URL as string;

function Kakao() {
  const handleClick = () => {
    window.open(`${url}/v1/socials/google`, '_self');
  };

  return (
    <Common onClick={handleClick}>
      <RiKakaoTalkFill />
    </Common>
  );
}

export default Kakao;
