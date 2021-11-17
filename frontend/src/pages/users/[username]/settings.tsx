import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

import Header from 'src/components/Header';
import FloatingButton from 'src/components/buttons/FloatingButton';
import UserSettingsCard from 'src/components/cards/UserSettingsCard';
import { Row } from 'src/components/Grid';

import { SETTING_DESCRIPTION } from 'src/globals/descriptions';
import { FAVICON } from 'src/globals/constants';

import { Page } from 'src/styles';

import userAtom from 'src/recoil/user';

function Settings() {
  const router = useRouter();
  const targetUsername = router.query.username;
  const user = useRecoilValue(userAtom);

  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={SETTING_DESCRIPTION} />
        <link rel='icon' href={FAVICON} />
      </Head>

      <Header />
      <Page.Main>
        <Row justifyContent='center'>
          {targetUsername === user.username ? <UserSettingsCard /> : <p>퍼미션 디나이드</p>}
        </Row>
      </Page.Main>
      <FloatingButton />
    </>
  );
}

export default Settings;
