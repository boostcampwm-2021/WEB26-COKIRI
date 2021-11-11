import Head from 'next/head';

import Header from 'src/components/Header';
import { ECHO_DESCRIPTION } from 'src/globals/descriptions';

function Echo() {
  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={ECHO_DESCRIPTION} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main>Echo home</main>

      <footer />
    </div>
  );
}

export default Echo;
