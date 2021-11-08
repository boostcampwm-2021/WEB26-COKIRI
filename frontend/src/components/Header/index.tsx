import Image from 'next/image';
import { IoHome, IoCompass, IoPaperPlaneOutline, IoHeart, IoPersonCircle } from 'react-icons/io5';

import { Row } from 'src/components/Grid';
import NavigateButton from 'src/components/buttons/NavigateButton';
import LogoButton from 'src/components/buttons/LogoButton';
import SearchBox from 'src/components/SearchBox';

import { Wrapper, Section } from './style';

function Header() {
  return (
    <Wrapper>
      <Row>
        <Section>
          <LogoButton href='/home'>
            <Image src='/images/logo.svg' width='64' height='24' />
          </LogoButton>
          <SearchBox />
        </Section>

        <Section>
          <NavigateButton href='/home'>
            <IoHome />
          </NavigateButton>
          <NavigateButton href='/random'>
            <IoCompass />
          </NavigateButton>
          <NavigateButton href='/echo'>
            <IoPaperPlaneOutline />
          </NavigateButton>
        </Section>

        <Section>
          <button type='button'>
            <IoHeart size='25' />
          </button>
          <NavigateButton href='/users/tiger'>
            <IoPersonCircle />
          </NavigateButton>
        </Section>
      </Row>
    </Wrapper>
  );
}

export default Header;
