import Head from 'next/head';

import Header from 'src/components/Header';

import { RANDOM_DESCRIPTION } from 'src/globals/descriptions';

function Random() {
  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={RANDOM_DESCRIPTION} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main>random</main>

      <footer />
    </div>
  );
}

export default Random;
