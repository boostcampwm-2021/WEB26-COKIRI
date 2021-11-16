import Head from 'next/head';

import Header from 'src/components/Header';
import RandomTimeline from 'src/components/RandomTimeline';

import { RANDOM_DESCRIPTION } from 'src/globals/descriptions';

import { Page } from 'src/styles';

import { PostType } from 'src/types';

import { Fetcher } from 'src/utils';

interface Props {
  posts: PostType[];
}

function Random({ posts }: Props) {
  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={RANDOM_DESCRIPTION} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Page.Main>
        <RandomTimeline posts={posts!} />
      </Page.Main>
      <footer />
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await Fetcher.getRandomPosts();
  return { props: { posts } };
}

export default Random;
