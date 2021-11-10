import Head from 'next/head';

import Header from 'src/components/Header';

import descriptions from 'src/utils/descriptions';

function Random() {
  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={descriptions.random} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main>random</main>

      <footer />
    </div>
  );
}

export default Random;
