import Head from 'next/head';
import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import Timeline from 'src/components/Timeline';
import Header from 'src/components/Header';
import FloatingButton from 'src/components/buttons/FloatingButton';
import { Col } from 'src/components/Grid';

import { RANDOM_DESCRIPTION } from 'src/globals/descriptions';
import { FAVICON } from 'src/globals/images';

import { Page } from 'src/styles';

import { isRegisteredSelector } from 'src/recoil/user';

import { Fetcher } from 'src/utils';

function Random() {
  const isRegistered = useRecoilValue(isRegisteredSelector);
  const { refetch, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['random', 'posts'],
    (context) => Fetcher.getRandomPosts(context),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={RANDOM_DESCRIPTION} />
        <link rel='icon' href={FAVICON} />
      </Head>

      <Header page='random' />
      <Page.Main>
        <Col alignItems='center'>
          <Timeline
            pages={data?.pages}
            onPostDelete={refetch}
            onNeedMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </Col>
      </Page.Main>
      {isRegistered && <FloatingButton />}
    </>
  );
}

export default Random;
