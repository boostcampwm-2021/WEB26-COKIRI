import Head from 'next/head';
import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import Header from 'src/components/Header';
import Timeline from 'src/components/Timeline';
import UserInfoCard from 'src/components/cards/UserInfoCard';
import FloatingButton from 'src/components/buttons/FloatingButton';
import LoadingIndicator from 'src/components/LoadingIndicator';
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
  const isUserExist = Object.keys(targetUser).length !== 0;
  const isRegistered = useRecoilValue(isRegisteredSelector);
  const { refetch, data } = useInfiniteQuery(
    ['user', 'posts', targetUser],
    () => Fetcher.getUserPosts(targetUser),
    {
      getNextPageParam: (lastPage) => lastPage, // @TODO nextCursor property update
    },
  );

  const handlePostWrite = () => {
    refetch();
  };

  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={USERS_DESCRIPTION} />
        <link rel='icon' href={FAVICON} />
      </Head>

      <Header page='username' />
      <Page.Main>
        <LoadingIndicator />
        <Col alignItems='center'>
          {isUserExist ? (
            <>
              <UserInfoCard targetUser={targetUser} />
              <Timeline pages={data?.pages} />
            </>
          ) : (
            <>없다!</>
          )}
        </Col>
      </Page.Main>
      {isRegistered && <FloatingButton onPostWrite={handlePostWrite} />}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { username } = context.query;
  const token = context.req?.cookies.jwt;
  if (token === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  const targetUser = await Fetcher.getUsersByUsername(token, username);
  return {
    props: { targetUser },
  };
}

export default User;
