import { MutableSnapshot, RecoilRoot } from 'recoil';

import Header from 'src/components/Header';
import HomeHead from 'src/components/heads/HomeHead';
import HomeMain from 'src/components/mains/HomeMain';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import { PostType, UserType } from 'src/types';

interface Props {
  user: UserType;
  firstPost?: PostType;
}

const initState =
  (user: UserType) =>
  ({ set }: MutableSnapshot) =>
    set(userAtom, user);

function Home({ user, firstPost }: Props) {
  return (
    <>
      <HomeHead />
      <Header />
      <RecoilRoot initializeState={initState(user)}>
        <HomeMain firstPost={firstPost} />
      </RecoilRoot>
    </>
  );
}

Home.defaultProps = {
  firstPost: undefined,
};

export async function getServerSideProps({ req }: any) {
  const token = req.headers.cookie?.split('=')[1];
  if (token === undefined) {
    return { props: { user: {} } };
  }
  const user = await Fetcher.getUsersMe(token);
  const firstPost = await Fetcher.getFirstPost(user, token);
  return { props: { user: { ...user, token }, firstPost } };
}

export default Home;
