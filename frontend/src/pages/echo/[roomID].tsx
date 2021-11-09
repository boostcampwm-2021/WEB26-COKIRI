import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from 'src/components/Header';

function Echo() {
  const router = useRouter();
  const { roomID } = router.query;

  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta
          name='description'
          content='COCOO 사용자들에게 메시지를 보낼 수 있습니다. COCOO에서 대화를 나누어 보세요.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main>Echo {roomID}</main>

      <footer />
    </div>
  );
}

export default Echo;
