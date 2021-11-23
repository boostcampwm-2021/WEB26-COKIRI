import Head from 'next/head';

import Header from 'src/components/Header';
import DashboardUserInfoCard from 'src/components/cards/DashboardUserInfoCard';
import DashboardLinkCard from 'src/components/cards/DashboardLinkCard';
import DashboardStackCard from 'src/components/cards/DashboardStackCard';
import DashboardStatisticsCard from 'src/components/cards/DashboardStatisticsCard';
import DashboardGithubRepoCard from 'src/components/cards/DashboardGithubRepoCard';
import DashboardHistoryCard from 'src/components/cards/DashboardHistoryCard';
import { Row, Col } from 'src/components/Grid';

import { DASHBOARD_DESCRIPTION } from 'src/globals/descriptions';
import { FAVICON } from 'src/globals/constants';

import { Page } from 'src/styles';

function Dashboard() {
  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={DASHBOARD_DESCRIPTION} />
        <link rel='icon' href={FAVICON} />
      </Head>

      <Header />
      <Page.Main>
        <Row justifyContent='center'>
          <Col alignItems='center'>
            <DashboardUserInfoCard />
            <DashboardStackCard />
            <DashboardStatisticsCard />
            <DashboardGithubRepoCard />
          </Col>
          <Col alignItems='center'>
            <DashboardLinkCard />
            <DashboardHistoryCard />
          </Col>
        </Row>
      </Page.Main>
    </>
  );
}

export default Dashboard;
