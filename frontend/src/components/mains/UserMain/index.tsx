import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from 'react-query';

import Timeline from 'src/components/Timeline';
import SigninCard from 'src/components/cards/SigninCard';
import UserInfoCard from 'src/components/cards/UserInfoCard';
import UserNotFoundCard from 'src/components/cards/UserNotFoundCard';
import FloatingButton from 'src/components/buttons/FloatingButton';
import { Row } from 'src/components/Grid';

import { Page } from 'src/styles';

import { isAuthenticatedSelector, isRegisteredSelector } from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import { UserType } from 'src/types';

interface Props {
  targetUser: UserType;
}

function UserMain({ targetUser }: Props) {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const isRegistered = useRecoilValue(isRegisteredSelector);

  const [refetchCount, setRefetchCount] = useState(0);
  const isUserExist = Object.keys(targetUser).length !== 0;
  const { refetch, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['user', 'posts', targetUser],
    (context) => Fetcher.getUserPosts(targetUser, context),
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
      {!isAuthenticated && (
        <Row justifyContent='center'>
          <SigninCard />
        </Row>
      )}
      {isUserExist ? (
        <>
          <Row justifyContent='center'>
            <UserInfoCard targetUser={targetUser} />
          </Row>
          <Timeline
            pages={data?.pages}
            onPostDelete={refetchWithCount}
            onNeedMore={fetchNextPage}
            refetchCount={refetchCount}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </>
      ) : (
        <UserNotFoundCard />
      )}
      {isRegistered && <FloatingButton onPostWrite={refetchWithCount} />}
    </Page.Main>
  );
}

export default UserMain;
