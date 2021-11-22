import Head from 'next/head';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from 'react-query';

import Timeline from 'src/components/Timeline';
import Header from 'src/components/Header';
import SigninCard from 'src/components/cards/SigninCard';
import FloatingButton from 'src/components/buttons/FloatingButton';
import SuggestionCard from 'src/components/cards/SuggestionCard';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { Col } from 'src/components/Grid';

import userAtom, {
  hasFollowSelector,
  isAuthenticatedSelector,
  isRegisteredSelector,
} from 'src/recoil/user';

import { Page } from 'src/styles';

import { Fetcher } from 'src/utils';

import { HOME_DESCRIPTION } from 'src/globals/descriptions';
import { FAVICON } from 'src/globals/constants';

function Home() {
  const user = useRecoilValue(userAtom);
  const hasFollow = useRecoilValue(hasFollowSelector);
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const isRegistered = useRecoilValue(isRegisteredSelector);

  const [hasFollowTemp] = useState(hasFollow);
  const { refetch, data } = useInfiniteQuery(
    ['home', 'posts', user],
    (context) => Fetcher.getPosts(user, context),
    {
      getNextPageParam: (lastPage) => lastPage, // @TODO nextCursor property update
    },
  );

  const handlePostWrite = () => {
    refetch();
  };

  const handlePostDelete = () => {
    refetch();
  };
  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={HOME_DESCRIPTION} />
        <link rel='icon' href={FAVICON} />
      </Head>

      <Header page='home' />
      <Page.Main>
        <LoadingIndicator />
        <Col alignItems='center'>
          {!isAuthenticated && <SigninCard />}
          {isAuthenticated && !hasFollowTemp && <SuggestionCard />}
          {isRegistered && <Timeline pages={data?.pages} onPostDelete={handlePostDelete} />}
        </Col>
      </Page.Main>
      {isRegistered && <FloatingButton onPostWrite={handlePostWrite} />}
    </>
  );
}

export default Home;
