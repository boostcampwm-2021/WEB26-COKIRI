import Head from 'next/head';
import { useRouter } from 'next/router';

function Post() {
  const router = useRouter();
  const { postID } = router.query;

  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta
          name='description'
          content='COCOO 사용자의 포스트 전체 내용을 확인 할 수 있습니다. COCOO에서 포스트 내용을 확인하세요.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>Post {postID}</main>

      <footer />
    </div>
  );
}

export default Post;
