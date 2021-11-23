import Head from 'next/head';
import { useRouter } from 'next/router';

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

import { Page } from 'src/styles';

function Dashboard() {
  const router = useRouter();
  const { username } = router.query;
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
            <DashboardUserInfoCard username={username as string} />
            <DashboardLinkCard />
          </Row>
          <Row>
            <Col>
              <DashboardStackCard />
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

export default Dashboard;
