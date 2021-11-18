import Head from 'next/head';
import { useRouter } from 'next/router';

import { STORY_DESCRIPTION } from 'src/globals/descriptions';
import { FAVICON } from 'src/globals/constants';

function Story() {
  const router = useRouter();
  const { storyID } = router.query;

  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={STORY_DESCRIPTION} />
        <link rel='icon' href={FAVICON} />
      </Head>

      <main>Story {storyID}</main>
    </>
  );
}

export default Story;
