import Head from 'next/head';

function Random() {
  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta
          name='description'
          content='COCOO 사용자의 포스틀 랜덤으로 구경할 수 있습니다. COCOO에서 다른 사용자의 포스트를 구경하세요'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>random</main>

      <footer />
    </div>
  );
}

export default Random;
