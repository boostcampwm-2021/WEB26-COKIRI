import Head from 'next/head';
import { useRouter } from 'next/router';

function Story() {
  const router = useRouter();
  const { storyID } = router.query;

  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta
          name='description'
          content='COCOO 사용자의 일상을 24시간 동안만 공유합니다. COCOO에서 story를 확인하세요.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>Story {storyID}</main>

      <footer />
    </div>
  );
}

export default Story;
