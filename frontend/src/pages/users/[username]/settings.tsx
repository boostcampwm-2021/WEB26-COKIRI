import Head from 'next/head';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import Header from 'src/components/Header';
import FloatingButton from 'src/components/buttons/FloatingButton';
import UserSettingsCard from 'src/components/cards/UserSettingsCard';
import { Row } from 'src/components/Grid';

import { UserType } from 'src/types';

import { Fetcher } from 'src/utils';
import { SETTING_DESCRIPTION } from 'src/globals/descriptions';

import { Page } from 'src/styles';

import userAtom from 'src/recoil/user';

interface Props {
  user: UserType;
}

function Settings({ user }: Props) {
  const setUser = useSetRecoilState(userAtom);
  useEffect(() => setUser(user), [setUser, user]);

  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={SETTING_DESCRIPTION} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Page.Main>
        <Row>
          <UserSettingsCard user={user} />
        </Row>
      </Page.Main>
      <FloatingButton />
      <footer />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { username } = context.query;
  const token = context.req?.cookies.jwt;
  const redirect = {
    permanent: false,
    destination: '/',
  };
  if (token === undefined) {
    return { redirect };
  }
  const usersByUsernameRequest = Fetcher.getUsersByUsername(token, username);
  const usersMeRequests = Fetcher.getUsersMe(token);
  const targetUser = await usersByUsernameRequest;
  const user = await usersMeRequests;
  if (targetUser._id !== user._id) {
    return { redirect };
  }
  return {
    props: { user: { ...user, token } },
  };
}

export default Settings;
