import { MutableSnapshot, RecoilRoot } from 'recoil';

import Header from 'src/components/Header';
import SettingsHead from 'src/components/heads/SettingsHead';
import SettingsMain from 'src/components/mains/SettingsMain';
import RegisterModal from 'src/components/modals/RegisterModal';

import userAtom from 'src/recoil/user';

import { UserType } from 'src/types';

import { Fetcher } from 'src/utils';

const initState =
  (user: UserType) =>
  ({ set }: MutableSnapshot) =>
    set(userAtom, user);

interface Props {
  user?: UserType;
}

function Settings({ user }: Props) {
  return (
    <>
      <SettingsHead />
      <RecoilRoot initializeState={initState(user ?? {})}>
        <Header />
        <SettingsMain />
        <RegisterModal />
      </RecoilRoot>
    </>
  );
}

Settings.defaultProps = {
  user: undefined,
};

export async function getServerSideProps({ req }: any) {
  const props: { user?: UserType } = {};
  const token = req.headers.cookie?.split('=')[1];
  if (token === undefined) {
    return props;
  }
  const user = await Fetcher.getUsersMe(token);
  props.user = { ...user, token };
  return { props };
}

export default Settings;
