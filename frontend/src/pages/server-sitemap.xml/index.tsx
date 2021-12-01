// eslint-disable-next-line import/no-extraneous-dependencies
import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [
    {
      loc: `${process.env.NEXT_PUBLIC_CLIENT_URL}/posts/:postID`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_CLIENT_URL}/users/:userID`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_CLIENT_URL}/users/:userID/dashboard`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_CLIENT_URL}/users/:userID/setting`,
      lastmod: new Date().toISOString(),
    },
  ];

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
