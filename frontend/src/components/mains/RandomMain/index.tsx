import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from 'react-query';

import Timeline from 'src/components/Timeline';
import FloatingButton from 'src/components/buttons/FloatingButton';

import { Page } from 'src/styles';

import { isRegisteredSelector } from 'src/recoil/user';

import { Fetcher } from 'src/utils';

function RandomMain() {
  const isRegistered = useRecoilValue(isRegisteredSelector);
  const [refetchCount, setRefetchCount] = useState(0);
  const { refetch, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['random', 'posts'],
    (context) => Fetcher.getRandomPosts(context),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const refetchWithCount = async () => {
    await refetch();
    setRefetchCount(refetchCount + 1);
  };

  return (
    <Page.Main>
      <Timeline
        pages={data?.pages}
        onPostDelete={refetchWithCount}
        onNeedMore={fetchNextPage}
        refetchCount={refetchCount}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      {isRegistered && <FloatingButton onPostWrite={refetchWithCount} />}
    </Page.Main>
  );
}

export default RandomMain;
