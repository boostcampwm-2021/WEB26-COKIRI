import Link from 'next/link';
import Image from 'next/image';

import ButtonCommon from 'src/components/buttons/Common';

import {
  LOGO_BUTTON_WIDTH,
  LOGO_BUTTON_HEIGHT,
  LOGO_IMAGE_WIDTH,
  LOGO_IMAGE_HEIGHT,
} from 'src/globals/constants';
import { LOGO_IMAGE } from 'src/globals/images';

function LogoButton() {
  return (
    <ButtonCommon width={LOGO_BUTTON_WIDTH} height={LOGO_BUTTON_HEIGHT} title='logo'>
      <Link href='/home' passHref>
        <a>
          <Image src={LOGO_IMAGE} width={LOGO_IMAGE_WIDTH} height={LOGO_IMAGE_HEIGHT} alt='cocoo' />
        </a>
      </Link>
    </ButtonCommon>
  );
}

export default LogoButton;
