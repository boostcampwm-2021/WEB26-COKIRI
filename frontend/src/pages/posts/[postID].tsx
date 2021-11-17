import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useState } from 'react';

import Header from 'src/components/Header';
import DetailPost from 'src/components/DetailPost';

import { POSTS_DESCRIPTION } from 'src/globals/descriptions';
import { FAVICON } from 'src/globals/constants';

import { Fetcher } from 'src/utils';

import { Page } from 'src/styles';

function Post() {
  const router = useRouter();
  const { postID } = router.query;
  const [detailPost, setDetailPost] = useState({});
  const { isFetched } = useQuery(['detail', 'posts'], () => Fetcher.getDetailPost(postID!), {
    onSuccess: (post) => setDetailPost(post),
  });
  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={POSTS_DESCRIPTION} />
        <link rel='icon' href={FAVICON} />
      </Head>

      <Header />
      <Page.Main>{isFetched && <DetailPost post={detailPost} />}</Page.Main>
    </>
  );
}

export default Post;
