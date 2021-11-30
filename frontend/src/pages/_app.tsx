import type { AppProps } from 'next/app';
import { ThemeProvider, Global } from '@emotion/react';
import { QueryClientProvider, QueryClient } from 'react-query';

import { theme, global } from 'src/styles';

import { UserType } from 'src/types';

import useScrollRestoration from 'src/hooks/scrollResoration';

const queryClient = new QueryClient();

interface Props extends AppProps {
  user: UserType;
}

function MyApp({ Component, pageProps, router }: Props) {
  useScrollRestoration(router);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={global(theme)} />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
