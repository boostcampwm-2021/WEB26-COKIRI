import Head from 'next/head';

import Header from 'src/components/Header';

import descriptions from 'src/globals/descriptions';

function Dashboard() {
  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={descriptions.dashboard} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main>dashboard</main>

      <footer />
    </div>
  );
}

export default Dashboard;
