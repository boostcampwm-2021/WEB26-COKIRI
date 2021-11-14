import Head from 'next/head';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

import Header from 'src/components/Header';
import UserInfoCard from 'src/components/cards/UserInfoCard';
import Timeline from 'src/components/Timeline';
import FloatingButton from 'src/components/buttons/FloatingButton';
import { Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import { Fetcher } from 'src/utils';
import { USERS_DESCRIPTION } from 'src/globals/descriptions';

import { Page } from 'src/styles';

import userAtom from 'src/recoil/user';

interface Props {
  user: UserType;
  targetUser: UserType;
}

function User({ user, targetUser }: Props) {
  const setUser = useSetRecoilState(userAtom);
  useEffect(() => setUser(user), [setUser, user]);
  const { data } = useQuery(['posts', targetUser._id], () => Fetcher.getUserPosts(targetUser));

  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={USERS_DESCRIPTION} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Page.Main>
        <Col alignItems='center'>
          <UserInfoCard targetUser={targetUser} isMe={targetUser._id === user._id} />
          <Timeline posts={data} />
        </Col>
      </Page.Main>
      <FloatingButton />
      <footer />
    </div>
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
  const usersByUsernameRequest = Fetcher.getUsersByUsername(token, username);
  const usersMeRequests = Fetcher.getUsersMe(token);
  const targetUser = await usersByUsernameRequest;
  const user = await usersMeRequests;
  return {
    props: { user: { ...user, token }, targetUser },
  };
}

export default User;
