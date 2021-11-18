import { RiGithubFill } from 'react-icons/ri';

import SocialCommon from 'src/components/buttons/socials/Common';

const url = process.env.NEXT_PUBLIC_SERVER_URL as string;

function Github() {
  const handleClick = () => {
    window.open(`${url}/v1/socials/google`, '_self');
  };

  return (
    <SocialCommon onClick={handleClick}>
      <RiGithubFill />
    </SocialCommon>
  );
}

export default Github;
