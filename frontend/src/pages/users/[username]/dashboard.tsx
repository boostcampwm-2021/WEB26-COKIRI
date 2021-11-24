import Head from 'next/head';

import Header from 'src/components/Header';
import DashboardBasicCard from 'src/components/cards/DashboardBasicCard';
import DashboardLinkCard from 'src/components/cards/DashboardLinkCard';
import DashboardStacksCard from 'src/components/cards/DashboardStacksCard';
import DashboardStatisticsCard from 'src/components/cards/DashboardStatisticsCard';
import DashboardRepoCard from 'src/components/cards/DashboardRepoCard';
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
        <Col alignItems='center'>
          <Row>
            <DashboardBasicCard />
            <DashboardLinkCard />
          </Row>
          <Row>
            <Col>
              <DashboardStacksCard />
              <DashboardStatisticsCard />
              <DashboardRepoCard />
            </Col>
            <DashboardHistoryCard />
          </Row>
        </Col>
      </Page.Main>
    </>
  );
}

export default Dashboard;
