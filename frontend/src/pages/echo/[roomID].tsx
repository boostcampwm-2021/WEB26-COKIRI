import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from 'src/components/Header';
import descriptions from 'src/utils/descriptions';

function Echo() {
  const router = useRouter();
  const { roomID } = router.query;

  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={descriptions.echo} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main>Echo {roomID}</main>

      <footer />
    </div>
  );
}

export default Echo;
