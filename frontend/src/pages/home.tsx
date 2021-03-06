import { MutableSnapshot, RecoilRoot } from 'recoil';

import Header from 'src/components/Header';
import HomeHead from 'src/components/heads/HomeHead';
import HomeMain from 'src/components/mains/HomeMain';
import RegisterModal from 'src/components/modals/RegisterModal';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import { PostType, UserType } from 'src/types';

interface Props {
  user?: UserType;
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
      <RecoilRoot initializeState={initState(user ?? {})}>
        <Header />
        <HomeMain firstPost={firstPost} />
        <RegisterModal />
      </RecoilRoot>
    </>
  );
}

Home.defaultProps = {
  user: undefined,
  firstPost: undefined,
};

export async function getServerSideProps({ req }: any) {
  const props: { user?: UserType; firstPost?: PostType } = {};
  const token = req.headers.cookie?.split('=')[1];
  if (token === undefined) {
    return { props };
  }
  const user = await Fetcher.getUsersMe(token);
  const firstPost = await Fetcher.getFirstPost(user, token);
  props.user = { ...user, token };
  if (firstPost) {
    props.firstPost = firstPost;
  }
  return { props };
}

export default Home;
