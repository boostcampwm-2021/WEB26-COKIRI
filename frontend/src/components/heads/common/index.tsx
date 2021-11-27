import Head from 'next/head';
import PropTypes from 'prop-types';

import { FAVICON, LOGO_BACKGROUND_IMAGE } from 'src/globals/images';

interface Props {
  path: string;
  title: string;
  description: string;
  image: string;
  keywords: string[];
}

const url = process.env.NEXT_PUBLIC_SERVER_URL as string;

function HeadCommon({ path, title, description, image, keywords }: Props) {
  return (
    <Head>
      <meta property='og:url' content={url + path} />
      <meta property='og:title' content={title} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={image} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content='COCOO' />
      <meta property='og:locale' content='ko_KR' />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords.join(',')} />
      <title>{title}</title>
      <link rel='icon' href={FAVICON} />
    </Head>
  );
}

HeadCommon.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
};

HeadCommon.defaultProps = {
  title: '',
  path: '',
  image: LOGO_BACKGROUND_IMAGE,
  description: '',
  keywords: [],
};

export default HeadCommon;
