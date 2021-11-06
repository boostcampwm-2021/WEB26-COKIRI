import type { AppProps } from 'next/app';
import { ThemeProvider, Global } from '@emotion/react';
import { RecoilRoot } from 'recoil';

import { theme, global } from 'src/styles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Global styles={global} />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
