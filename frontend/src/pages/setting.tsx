import type { ReactElement } from 'react';
import Head from 'next/head';

function Setting(): ReactElement {
  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta
          name='description'
          content='COCOO 사용자 자신의 이름, 소개글 등을 수정할 수 있습니다. COCOO에서 자신의 프로필을 수정하세요'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>setting</main>

      <footer />
    </div>
  );
}

export default Setting;
