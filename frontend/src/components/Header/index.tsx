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
import SearchInput from 'src/components/inputs/SearchInput';

import userAtom from 'src/recoil/user';

import { Wrapper, Section } from './style';

function Header() {
  const user = useRecoilValue(userAtom);

  return (
    <Wrapper>
      <Section>
        <LogoButton />
        <SearchInput />
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
    </Wrapper>
  );
}

export default Header;
