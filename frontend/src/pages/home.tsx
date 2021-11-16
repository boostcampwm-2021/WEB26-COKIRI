import Head from 'next/head';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import Timeline from 'src/components/Timeline';
import Header from 'src/components/Header';
import SigninCard from 'src/components/cards/SigninCard';
import RegisterModal from 'src/components/modals/RegisterModal';
import FloatingButton from 'src/components/buttons/FloatingButton';
import SuggestionCard from 'src/components/cards/SuggestionCard';
import { Col } from 'src/components/Grid';

import userAtom, { followsSelector, isAuthenticatedSelector } from 'src/recoil/user';
import postsAtom from 'src/recoil/posts';

import { Page } from 'src/styles';

import { Fetcher } from 'src/utils';

import { HOME_DESCRIPTION } from 'src/globals/descriptions';

function Home() {
  const user = useRecoilValue(userAtom);
  const follows = useRecoilValue(followsSelector);
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const setPosts = useSetRecoilState(postsAtom);

  const { isSuccess, data: posts } = useQuery(['home', 'posts', user._id], () =>
    Fetcher.getPosts(user),
  );

  useEffect(() => {
    if (isSuccess) {
      setPosts(posts!);
    }
  }, [isSuccess, posts, setPosts]);

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
          {follows?.length === 0 && <SuggestionCard />}
          {isAuthenticated && <Timeline />}
        </Col>
      </Page.Main>
      {isAuthenticated && <FloatingButton />}
      <RegisterModal />
    </>
  );
}

export default Home;
