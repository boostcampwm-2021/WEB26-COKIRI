import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from 'src/components/Header';
import { ECHO_DESCRIPTION } from 'src/globals/descriptions';

function Echo() {
  const router = useRouter();
  const { roomID } = router.query;

  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={ECHO_DESCRIPTION} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main>Echo {roomID}</main>

      <footer />
    </div>
  );
}

export default Echo;
