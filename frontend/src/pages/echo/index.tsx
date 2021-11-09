import Head from 'next/head';

import Header from 'src/components/Header';

function Echo() {
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
      <main>Echo home</main>

      <footer />
    </div>
  );
}

export default Echo;
