import { MutableSnapshot, RecoilRoot } from 'recoil';

import Header from 'src/components/Header';
import RandomHead from 'src/components/heads/RandomHead';
import RandomMain from 'src/components/mains/RandomMain';
import RegisterModal from 'src/components/modals/RegisterModal';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import { UserType } from 'src/types';

interface Props {
  user?: UserType;
}

const initState =
  (user: UserType) =>
  ({ set }: MutableSnapshot) =>
    set(userAtom, user);

function Random({ user }: Props) {
  return (
    <>
      <RandomHead />
      <RecoilRoot initializeState={initState(user ?? {})}>
        <Header />
        <RandomMain />
        <RegisterModal />
      </RecoilRoot>
    </>
  );
}

Random.defaultProps = {
  user: undefined,
};

export async function getServerSideProps({ req }: any) {
  const props: { user?: UserType } = {};
  const token = req.headers.cookie?.split('=')[1];
  if (token === undefined) {
    return { props };
  }
  const user = await Fetcher.getUsersMe(token);
  props.user = { ...user, token };
  return { props };
}

export default Random;
