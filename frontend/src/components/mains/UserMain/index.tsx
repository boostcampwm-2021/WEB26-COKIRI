import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from 'react-query';

import Timeline from 'src/components/Timeline';
import SigninCard from 'src/components/cards/SigninCard';
import UserInfoCard from 'src/components/cards/UserInfoCard';
import UserNotFoundCard from 'src/components/cards/UserNotFoundCard';
import FloatingButton from 'src/components/buttons/FloatingButton';
import { Col } from 'src/components/Grid';

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

  const isUserExist = Object.keys(targetUser).length !== 0;
  const { refetch, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['user', 'posts', targetUser],
    (context) => Fetcher.getUserPosts(targetUser, context),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  return (
    <Page.Main>
      <Col alignItems='center'>
        {!isAuthenticated && <SigninCard />}
        {isUserExist ? (
          <>
            <UserInfoCard targetUser={targetUser} />
            <Timeline
              pages={data?.pages}
              onPostDelete={refetch}
              onNeedMore={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </>
        ) : (
          <UserNotFoundCard />
        )}
      </Col>
      {isRegistered && <FloatingButton onPostWrite={refetch} />}
    </Page.Main>
  );
}

export default UserMain;
