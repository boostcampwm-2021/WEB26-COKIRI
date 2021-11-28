import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import Header from 'src/components/Header';
import Timeline from 'src/components/Timeline';
import UserInfoCard from 'src/components/cards/UserInfoCard';
import FloatingButton from 'src/components/buttons/FloatingButton';
import SigninCard from 'src/components/cards/SigninCard';
import UserHead from 'src/components/heads/UserHead';
import UserNotFoundCard from 'src/components/cards/UserNotFoundCard';
import { Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import { Fetcher } from 'src/utils';

import { isAuthenticatedSelector, isRegisteredSelector } from 'src/recoil/user';

import { Page } from 'src/styles';

interface Props {
  targetUser: UserType;
}

function User({ targetUser }: Props) {
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
  const { username, profileImage, bio, name } = targetUser;

  return (
    <>
      <UserHead username={username} profileImage={profileImage} bio={bio} name={name} />
      <Header />
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
      </Page.Main>
      {isRegistered && <FloatingButton onPostWrite={refetch} />}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { username } = context.query;
  const targetUser = await Fetcher.getUsersByUsername(username);
  return {
    props: { targetUser },
  };
}

export default User;
