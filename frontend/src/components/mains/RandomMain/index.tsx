import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from 'react-query';

import Timeline from 'src/components/Timeline';
import FloatingButton from 'src/components/buttons/FloatingButton';

import { Page } from 'src/styles';

import { isRegisteredSelector } from 'src/recoil/user';

import { Fetcher } from 'src/utils';

function RandomMain() {
  const isRegistered = useRecoilValue(isRegisteredSelector);
  const { refetch, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['random', 'posts'],
    (context) => Fetcher.getRandomPosts(context),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  return (
    <Page.Main>
      <Timeline
        pages={data?.pages}
        onPostDelete={refetch}
        onNeedMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      {isRegistered && <FloatingButton />}
    </Page.Main>
  );
}

export default RandomMain;
