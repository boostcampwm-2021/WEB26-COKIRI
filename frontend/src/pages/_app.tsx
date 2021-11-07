import type { AppProps } from 'next/app';
import { ThemeProvider, Global } from '@emotion/react';
import Header from 'src/components/Header';
import { theme, global } from 'src/styles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      <Header />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
