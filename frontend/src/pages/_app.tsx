import 'src/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider, Global } from '@emotion/react';

import { theme, global } from 'src/styles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
