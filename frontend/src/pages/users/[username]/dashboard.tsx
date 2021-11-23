import Head from 'next/head';

import Header from 'src/components/Header';
import DashboardUserInfoCard from 'src/components/cards/DashboardUserInfoCard';
import DashboardLinkCard from 'src/components/cards/DashboardLinkCard';
import DashboardStackCard from 'src/components/cards/DashboardStackCard';
import DashboardStatisticsCard from 'src/components/cards/DashboardStatisticsCard';
import DashboardRepoCard from 'src/components/cards/DashboardRepoCard';
import DashboardHistoryCard from 'src/components/cards/DashboardHistoryCard';
import { Row, Col } from 'src/components/Grid';

import { DASHBOARD_DESCRIPTION } from 'src/globals/descriptions';
import { FAVICON } from 'src/globals/constants';

import { DashboardType } from 'src/types';

import { Page } from 'src/styles';

import { Fetcher } from 'src/utils';

interface Props {
  dashboard: DashboardType;
  username: string;
}

function Dashboard({ dashboard, username }: Props) {
  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={DASHBOARD_DESCRIPTION} />
        <link rel='icon' href={FAVICON} />
      </Head>

      <Header />
      <Page.Main>
        <Col alignItems='center'>
          <Row>
            <DashboardUserInfoCard dashboard={dashboard} username={username as string} />
            <DashboardLinkCard dashboard={dashboard} />
          </Row>
          <Row>
            <Col>
              <DashboardStackCard techStacks={dashboard?.techStacks!} />
              <DashboardStatisticsCard />
              <DashboardRepoCard username={username as string} />
            </Col>
            <DashboardHistoryCard username={username as string} />
          </Row>
        </Col>
      </Page.Main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { username } = context.query;
  const { dashboard } = await Fetcher.getUserInfo(username);
  return { props: { dashboard, username } };
}

export default Dashboard;
