import { MutableSnapshot, RecoilRoot } from 'recoil';

import Header from 'src/components/Header';
import UserMain from 'src/components/mains/UserMain';
import UserHead from 'src/components/heads/UserHead';
import RegisterModal from 'src/components/modals/RegisterModal';

import { UserType } from 'src/types';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

interface Props {
  user?: UserType;
  targetUser?: UserType;
}

const initState =
  (user: UserType) =>
  ({ set }: MutableSnapshot) =>
    set(userAtom, user);

function User({ user, targetUser }: Props) {
  const { username, profileImage, bio, name } = targetUser ?? {};

  return (
    <>
      <UserHead username={username} profileImage={profileImage} bio={bio} name={name} />
      <RecoilRoot initializeState={initState(user ?? {})}>
        <Header />
        <UserMain targetUser={targetUser ?? {}} />
        <RegisterModal />
      </RecoilRoot>
    </>
  );
}

User.defaultProps = {
  user: undefined,
  targetUser: undefined,
};

export async function getServerSideProps({ query, req }: any) {
  const props: { user?: UserType; targetUser?: UserType } = {};
  const { username } = query;
  const targetUserRequest = Fetcher.getUsersByUsername(username);
  const token = req.headers.cookie?.split('=')[1];
  if (token !== undefined) {
    const userRequest = Fetcher.getUsersMe(token);
    props.user = { ...(await userRequest), token };
  }
  props.targetUser = await targetUserRequest;
  return { props };
}

export default User;
