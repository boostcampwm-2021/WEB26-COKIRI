import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from 'src/components/Header';

import { ECHO_DESCRIPTION } from 'src/globals/descriptions';
import { FAVICON } from 'src/globals/constants';

function Echo() {
  const router = useRouter();
  const { roomID } = router.query;

  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={ECHO_DESCRIPTION} />
        <link rel='icon' href={FAVICON} />
      </Head>

      <Header />
      <main>Echo {roomID}</main>
    </>
  );
}

export default Echo;
