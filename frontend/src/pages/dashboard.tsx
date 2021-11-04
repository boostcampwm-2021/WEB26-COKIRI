import type { ReactElement } from 'react';
import Head from 'next/head';

function Dashboard(): ReactElement {
  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta
          name='description'
          content='COCOO 사용자의 profile, github respository, blog 등 다양한 정보를 확인할 수 있습니다. COCOO에서 dashboard를 구경하세요.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>dashboard</main>

      <footer />
    </div>
  );
}

export default Dashboard;
