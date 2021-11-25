import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import { IoHomeOutline, IoCompassOutline, IoPersonCircleOutline } from 'react-icons/io5';

import NavigateIconButton from 'src/components/buttons/NavigateIconButton';
import LogoButton from 'src/components/buttons/LogoButton';
import UserSearchInput from 'src/components/inputs/UserSearchInput';
import NotificationButton from 'src/components/buttons/NotificationButton';

import userAtom, { isAuthenticatedSelector } from 'src/recoil/user';

import { Wrapper, Section } from './style';

interface Props {
  page?: string;
}

function Header({ page }: Props) {
  const user = useRecoilValue(userAtom);
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

  return (
    <Wrapper>
      <Section>
        <LogoButton />
        <UserSearchInput />
      </Section>

      <Section>
        <NavigateIconButton href='/home' clicked={page === 'home'}>
          <IoHomeOutline />
        </NavigateIconButton>
        <NavigateIconButton href='/random' clicked={page === 'random'}>
          <IoCompassOutline />
        </NavigateIconButton>
      </Section>

      <Section>
        {isAuthenticated && (
          <>
            <NotificationButton />
            <NavigateIconButton href={`/users/${user.username}`} clicked={page === 'username'}>
              <IoPersonCircleOutline />
            </NavigateIconButton>
          </>
        )}
      </Section>
    </Wrapper>
  );
}

Header.propTypes = {
  page: PropTypes.string,
};

Header.defaultProps = {
  page: '',
};

export default Header;
