import Common from 'src/components/buttons/socials/Common';
import { RiGithubFill } from 'react-icons/ri';

const url = process.env.NEXT_PUBLIC_SERVER_URL as string;

function Github() {
  const handleClick = () => {
    window.open(`${url}/v1/socials/google`, '_self');
  };

  return (
    <Common onClick={handleClick}>
      <RiGithubFill />
    </Common>
  );
}

export default Github;
