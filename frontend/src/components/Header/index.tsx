import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import {
  IoHomeOutline,
  IoCompassOutline,
  IoPersonCircleOutline,
  IoLogOutOutline,
} from 'react-icons/io5';

import NavigateIconButton from 'src/components/buttons/NavigateIconButton';
import LogoButton from 'src/components/buttons/LogoButton';
import UserSearchInput from 'src/components/inputs/UserSearchInput';
import NotificationButton from 'src/components/buttons/NotificationButton';
import IconButton from 'src/components/buttons/IconButton';

import userAtom, { isAuthenticatedSelector } from 'src/recoil/user';

import { Wrapper, Section } from './style';

const url = process.env.NEXT_PUBLIC_SERVER_URL;

function Header() {
  const user = useRecoilValue(userAtom);
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const router = useRouter();
  const paths = router.asPath.split('/');
  const firstRoute = paths[1];
  const username = paths[2];

  const handleLogoutClick = () => window.open(`${url}/v1/users/logout`, '_self');

  return (
    <Wrapper>
      <Section>
        <LogoButton />
        <UserSearchInput />
      </Section>
      <Section>
        <NavigateIconButton href='/home' clicked={firstRoute === 'home'}>
          <IoHomeOutline />
        </NavigateIconButton>
        <NavigateIconButton href='/random' clicked={firstRoute === 'random'}>
          <IoCompassOutline />
        </NavigateIconButton>
      </Section>
      <Section>
        {isAuthenticated && (
          <>
            <NotificationButton />
            <NavigateIconButton
              href={`/users/${user.username}`}
              clicked={firstRoute === 'users' && username === user.username}
            >
              <IoPersonCircleOutline />
            </NavigateIconButton>
            <IconButton onClick={handleLogoutClick} title='logout'>
              <IoLogOutOutline />
            </IconButton>
          </>
        )}
      </Section>
    </Wrapper>
  );
}

export default Header;
