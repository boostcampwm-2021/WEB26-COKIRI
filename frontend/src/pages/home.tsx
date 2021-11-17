import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import Timeline from 'src/components/Timeline';
import Header from 'src/components/Header';
import SigninCard from 'src/components/cards/SigninCard';
import FloatingButton from 'src/components/buttons/FloatingButton';
import SuggestionCard from 'src/components/cards/SuggestionCard';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { Col } from 'src/components/Grid';

import userAtom, {
  followsSelector,
  hasFollowSelector,
  isAuthenticatedSelector,
  isRegisteredSelector,
} from 'src/recoil/user';

import postsAtom from 'src/recoil/posts';

import { Page } from 'src/styles';

import { Fetcher } from 'src/utils';

import { HOME_DESCRIPTION } from 'src/globals/descriptions';
import { FAVICON } from 'src/globals/constants';

function Home() {
  const user = useRecoilValue(userAtom);
  const hasFollow = useRecoilValue(hasFollowSelector);
  const follows = useRecoilValue(followsSelector);
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const isRegistered = useRecoilValue(isRegisteredSelector);
  const setPosts = useSetRecoilState(postsAtom);

  const [hasFollowTemp] = useState(hasFollow);
  const { refetch, isFetched } = useQuery(
    ['home', 'posts', user._id],
    () => Fetcher.getPosts(user),
    {
      onSuccess: (posts) => {
        setPosts(posts!);
      },
    },
  );

  // when registered
  useEffect(() => {
    if (isRegistered) {
      refetch();
    }
  }, [isRegistered, refetch]);

  // when follows new user
  useEffect(() => {
    refetch();
  }, [follows, refetch]);

  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={HOME_DESCRIPTION} />
        <link rel='icon' href={FAVICON} />
      </Head>

      <Header />
      <Page.Main>
        <LoadingIndicator />
        <Col alignItems='center'>
          {!isAuthenticated && <SigninCard />}
          {isAuthenticated && !hasFollowTemp && <SuggestionCard />}
          {isAuthenticated && isRegistered && isFetched && <Timeline />}
        </Col>
      </Page.Main>
      {isAuthenticated && <FloatingButton />}
    </>
  );
}

export default Home;
