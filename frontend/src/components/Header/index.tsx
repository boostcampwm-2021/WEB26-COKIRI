import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import {
  IoHomeOutline,
  IoCompassOutline,
  IoPaperPlaneOutline,
  IoHeartOutline,
  IoPersonCircleOutline,
} from 'react-icons/io5';

import NavigateButton from 'src/components/buttons/NavigateButton';
import LogoButton from 'src/components/buttons/LogoButton';
import IconButton from 'src/components/buttons/IconButton';
import SearchBox from 'src/components/SearchBox';
import { Row } from 'src/components/Grid';

import userAtom from 'src/recoil/user';

import { LOGO_IMAGE, LOGO_IMAGE_WIDTH, LOGO_IMAGE_HEIGHT } from 'src/globals/constants';

import { Wrapper, Section } from './style';

function Header() {
  const user = useRecoilValue(userAtom);

  return (
    <Wrapper>
      <Row>
        <Section>
          <LogoButton href='/home'>
            <Image src={LOGO_IMAGE} width={LOGO_IMAGE_WIDTH} height={LOGO_IMAGE_HEIGHT} />
          </LogoButton>
          <SearchBox />
        </Section>

        <Section>
          <NavigateButton href='/home'>
            <IoHomeOutline />
          </NavigateButton>
          <NavigateButton href='/random'>
            <IoCompassOutline />
          </NavigateButton>
          <NavigateButton href='/echo'>
            <IoPaperPlaneOutline />
          </NavigateButton>
        </Section>

        <Section>
          <IconButton>
            <IoHeartOutline />
          </IconButton>
          <NavigateButton href={`/users/${user.username}`}>
            <IoPersonCircleOutline />
          </NavigateButton>
        </Section>
      </Row>
    </Wrapper>
  );
}

export default Header;
