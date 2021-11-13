import Link from 'next/link';

import Button from 'src/components/buttons/Common';

import {
  LOGO_BUTTON_WIDTH,
  LOGO_BUTTON_HEIGHT,
  LOGO_IMAGE,
  LOGO_IMAGE_WIDTH,
  LOGO_IMAGE_HEIGHT,
} from 'src/globals/constants';
import Image from 'next/image';

function LogoButton() {
  return (
    <Button width={LOGO_BUTTON_WIDTH} height={LOGO_BUTTON_HEIGHT}>
      <Link href='/home'>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <Image src={LOGO_IMAGE} width={LOGO_IMAGE_WIDTH} height={LOGO_IMAGE_HEIGHT} />
        </a>
      </Link>
    </Button>
  );
}

export default LogoButton;