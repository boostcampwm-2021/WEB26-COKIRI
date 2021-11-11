import Head from 'next/head';
import { useRouter } from 'next/router';

import descriptions from 'src/globals/descriptions';

function Story() {
  const router = useRouter();
  const { storyID } = router.query;

  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={descriptions.story} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>Story {storyID}</main>

      <footer />
    </div>
  );
}

export default Story;
