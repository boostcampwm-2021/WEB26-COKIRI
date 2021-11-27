import PropTypes from 'prop-types';
import type { AppContext, AppProps } from 'next/app';
import { ThemeProvider, Global } from '@emotion/react';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';

import RegisterModal from 'src/components/modals/RegisterModal';

import { theme, global } from 'src/styles';

import { DashboardUserInfoType, UserType } from 'src/types';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

const queryClient = new QueryClient();

const initState =
  (user: UserType) =>
  ({ set }: MutableSnapshot) =>
    set(userAtom, user);

interface Props extends AppProps {
  user: UserType;
}

function MyApp({ user, Component, pageProps }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot initializeState={initState(user)}>
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

MyApp.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
};

MyApp.defaultProps = {
  user: {},
};

MyApp.getInitialProps = async (context: AppContext) => {
  const props: { user?: UserType; dashboardUserInfo?: DashboardUserInfoType } = {};
  const token = context.ctx.req?.headers.cookie?.split('=')[1];
  if (token === undefined) {
    return props;
  }
  const user = await Fetcher.getUsersMe(token);
  props.user = { ...user, token };
  return props;
};

export default MyApp;
