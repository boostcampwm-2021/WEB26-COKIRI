import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from 'src/components/Header';
import DetailPost from 'src/components/DetailPost';

import { POSTS_DESCRIPTION } from 'src/globals/descriptions';
import { FAVICON } from 'src/globals/constants';

import { Page } from 'src/styles';

function Post() {
  const router = useRouter();
  const { postID } = router.query;
  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={POSTS_DESCRIPTION} />
        <link rel='icon' href={FAVICON} />
      </Head>

      <Header />
      <Page.Main>
        <DetailPost postID={postID!} />
      </Page.Main>
    </>
  );
}

export default Post;
