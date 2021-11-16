import Head from 'next/head';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import Timeline from 'src/components/Timeline';
import Header from 'src/components/Header';
import SigninCard from 'src/components/cards/SigninCard';
import FloatingButton from 'src/components/buttons/FloatingButton';
import SuggestionCard from 'src/components/cards/SuggestionCard';
import { Col } from 'src/components/Grid';

import userAtom, {
  hasFollowSelector,
  isAuthenticatedSelector,
  isRegisteredSelector,
} from 'src/recoil/user';

import postsAtom from 'src/recoil/posts';

import { Page } from 'src/styles';

import { Fetcher } from 'src/utils';

import { HOME_DESCRIPTION } from 'src/globals/descriptions';

function Home() {
  const user = useRecoilValue(userAtom);
  const hasFollow = useRecoilValue(hasFollowSelector);
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const isRegistered = useRecoilValue(isRegisteredSelector);
  const setPosts = useSetRecoilState(postsAtom);

  const {
    isSuccess,
    data: posts,
    refetch,
  } = useQuery(['home', 'posts', user._id], () => Fetcher.getPosts(user));

  useEffect(() => {
    if (isSuccess) {
      setPosts(posts!);
    }
  }, [isSuccess, posts, setPosts]);

  useEffect(() => {
    if (isRegistered) {
      refetch();
    }
  }, [isRegistered, refetch]);

  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={HOME_DESCRIPTION} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Page.Main>
        <Col alignItems='center'>
          {!isAuthenticated && <SigninCard />}
          {isAuthenticated && !hasFollow && <SuggestionCard />}
          {isAuthenticated && isRegistered && <Timeline />}
        </Col>
      </Page.Main>
      {isAuthenticated && <FloatingButton />}
    </>
  );
}

export default Home;
