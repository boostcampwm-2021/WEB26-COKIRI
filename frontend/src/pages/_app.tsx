import type { AppContext, AppProps } from 'next/app';
import { ThemeProvider, Global } from '@emotion/react';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';

import RegisterModal from 'src/components/modals/RegisterModal';

import { theme, global } from 'src/styles';

import { DashboardUserInfoType, UserType } from 'src/types';

import { Fetcher } from 'src/utils';

import dashboardUserInfoAtom from 'src/recoil/dashboardUserInfo';
import userAtom from 'src/recoil/user';

const queryClient = new QueryClient();

const getInitialState =
  (user?: UserType, dashboardUserInfo?: DashboardUserInfoType) =>
  ({ set }: MutableSnapshot) => {
    set(userAtom, user!);
    set(dashboardUserInfoAtom, dashboardUserInfo!);
  };

interface Props extends AppProps {
  user?: UserType;
  dashboardUserInfo?: DashboardUserInfoType;
}

function MyApp({ user, Component, pageProps, dashboardUserInfo }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot initializeState={getInitialState(user, dashboardUserInfo)}>
        <ThemeProvider theme={theme}>
          <Global styles={global(theme)} />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
          <RegisterModal />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

MyApp.defaultProps = {
  user: {},
  dashboardUserInfo: {},
};

MyApp.getInitialProps = async (context: AppContext) => {
  const paths = context.router.route.split('/');
  const lastPath = paths[paths.length - 1];
  const props: { user?: UserType; dashboardUserInfo?: DashboardUserInfoType } = {};
  if (lastPath === 'dashboard') {
    const username = context.router.query.username as string;
    const { data } = await Fetcher.getDashboardUserInfo(username);
    props.dashboardUserInfo = data;
  }
  const token = context.ctx.req?.headers.cookie?.split('=')[1];
  if (token === undefined) {
    return props;
  }
  const user = await Fetcher.getUsersMe(token);
  props.user = { ...user, token };
  return props;
};

export default MyApp;
