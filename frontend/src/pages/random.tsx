import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import Timeline from 'src/components/Timeline';
import Header from 'src/components/Header';
import FloatingButton from 'src/components/buttons/FloatingButton';
import RandomHead from 'src/components/heads/RandomHead';
import { Col } from 'src/components/Grid';

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
      <RandomHead />
      <Header />
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
