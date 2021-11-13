import { useRecoilValue } from 'recoil';
import {
  IoHomeOutline,
  IoCompassOutline,
  IoPaperPlaneOutline,
  IoHeartOutline,
  IoPersonCircleOutline,
} from 'react-icons/io5';

import NavigateIconButton from 'src/components/buttons/NavigateIconButton';
import LogoButton from 'src/components/buttons/LogoButton';
import IconButton from 'src/components/buttons/IconButton';
import SearchBox from 'src/components/SearchBox';
import { Row } from 'src/components/Grid';

import userAtom from 'src/recoil/user';

import { Wrapper, Section } from './style';

function Header() {
  const user = useRecoilValue(userAtom);

  return (
    <Wrapper>
      <Row>
        <Section>
          <LogoButton />
          <SearchBox />
        </Section>

        <Section>
          <NavigateIconButton href='/home'>
            <IoHomeOutline />
          </NavigateIconButton>
          <NavigateIconButton href='/random'>
            <IoCompassOutline />
          </NavigateIconButton>
          <NavigateIconButton href='/echo'>
            <IoPaperPlaneOutline />
          </NavigateIconButton>
        </Section>

        <Section>
          <IconButton>
            <IoHeartOutline />
          </IconButton>
          <NavigateIconButton href={`/users/${user.username}`}>
            <IoPersonCircleOutline />
          </NavigateIconButton>
        </Section>
      </Row>
    </Wrapper>
  );
}

export default Header;
