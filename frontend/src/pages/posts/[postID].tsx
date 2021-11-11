import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from 'src/components/Header';

import descriptions from 'src/globals/descriptions';

function Post() {
  const router = useRouter();
  const { postID } = router.query;

  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={descriptions.posts} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main>Post {postID}</main>

      <footer />
    </div>
  );
}

export default Post;
