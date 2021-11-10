import Head from 'next/head';

import Header from 'src/components/Header';

import descriptions from 'src/utils/descriptions';

function Setting() {
  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={descriptions.setting} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main>setting</main>

      <footer />
    </div>
  );
}

export default Setting;
