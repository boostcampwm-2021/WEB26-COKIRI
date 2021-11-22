import Head from 'next/head';
import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import Timeline from 'src/components/Timeline';
import Header from 'src/components/Header';
import FloatingButton from 'src/components/buttons/FloatingButton';
import { Col } from 'src/components/Grid';

import { RANDOM_DESCRIPTION } from 'src/globals/descriptions';
import { FAVICON } from 'src/globals/constants';

import { Page } from 'src/styles';

import { isRegisteredSelector } from 'src/recoil/user';

import { Fetcher } from 'src/utils';

function Random() {
  const isRegistered = useRecoilValue(isRegisteredSelector);
  const { data } = useInfiniteQuery(['random', 'posts'], () => Fetcher.getRandomPosts(), {
    getNextPageParam: (lastPage) => lastPage, // @TODO nextCursor property update
  });
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
          <Timeline pages={data?.pages} />
        </Col>
      </Page.Main>
      {isRegistered && <FloatingButton />}
    </>
  );
}

export default Random;
