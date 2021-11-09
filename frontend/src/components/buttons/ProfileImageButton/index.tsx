import Link from 'next/link';
import PropTypes from 'prop-types';
import Image from 'next/image';

import { Wrapper } from './style';

interface Props {
  href: string;
  imgSrc: string;
}

function ProfileImageButton({ href, imgSrc }: Props) {
  return (
    <Wrapper>
      <Link href={href}>
        <a href={href}>
          <Image src={imgSrc} width='36' height='36' />
        </a>
      </Link>
    </Wrapper>
  );
}

ProfileImageButton.propsType = {
  href: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default ProfileImageButton;
