import Head from 'next/head';
import { useRouter } from 'next/router';

import { STORY_DESCRIPTION } from 'src/globals/descriptions';

function Story() {
  const router = useRouter();
  const { storyID } = router.query;

  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={STORY_DESCRIPTION} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>Story {storyID}</main>

      <footer />
    </div>
  );
}

export default Story;
