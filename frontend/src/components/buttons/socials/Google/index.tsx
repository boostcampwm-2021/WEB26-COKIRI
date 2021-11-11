import { RiGoogleFill } from 'react-icons/ri';

import Social from 'src/components/buttons/socials/Common';

const url = process.env.NEXT_PUBLIC_SERVER_URL as string;

function Google() {
  const handleClick = () => {
    window.open(`${url}/v1/socials/google`, '_self');
  };

  return (
    <Social onClick={handleClick}>
      <RiGoogleFill />
    </Social>
  );
}

export default Google;
