import type { AppProps } from 'next/app';
import { ThemeProvider, Global } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';

import { theme, global } from 'src/styles';

import { Fetcher } from 'src/utils';

import { UserType } from 'src/types';

const queryClient = new QueryClient();

interface Props extends AppProps {
  user: UserType;
  token: string;
}

function MyApp({ Component, pageProps, user, token }: Props) {
  Fetcher.init(token);
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Global styles={global} />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} user={user} />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async (context: any) => {
  const token = context.ctx.req.cookies.jwt;
  if (token !== undefined) {
    const user: UserType = await Fetcher.getUsersMe(token);
    return { user, token };
  }
  return {
    user: {},
  };
};

export default MyApp;
