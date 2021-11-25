import Head from 'next/head';
import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import Header from 'src/components/Header';
import Timeline from 'src/components/Timeline';
import UserInfoCard from 'src/components/cards/UserInfoCard';
import FloatingButton from 'src/components/buttons/FloatingButton';
import SigninCard from 'src/components/cards/SigninCard';
import { Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import { Fetcher } from 'src/utils';

import { USERS_DESCRIPTION } from 'src/globals/descriptions';
import { FAVICON } from 'src/globals/constants';

import { isRegisteredSelector } from 'src/recoil/user';

import { Page } from 'src/styles';

interface Props {
  targetUser: UserType;
}

function User({ targetUser }: Props) {
  const isAuthenticated = useRecoilValue(isRegisteredSelector);
  const isUserExist = Object.keys(targetUser).length !== 0;
  const isRegistered = useRecoilValue(isRegisteredSelector);
  const { refetch, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['user', 'posts', targetUser],
    (context) => Fetcher.getUserPosts(targetUser, context),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={USERS_DESCRIPTION} />
        <link rel='icon' href={FAVICON} />
      </Head>

      <Header page='username' />
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
            <>없다!</>
          )}
        </Col>
      </Page.Main>
      {isRegistered && <FloatingButton onPostWrite={refetch} />}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { username } = context.query;
  const token = context.req?.cookies.jwt;
  const targetUser = await Fetcher.getUsersByUsername(token, username);
  return {
    props: { targetUser },
  };
}

export default User;
