import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
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

import userAtom from 'src/recoil/user';

import { Page } from 'src/styles';

function Dashboard() {
  const router = useRouter();
  const { username } = router.query;
  const user = useRecoilValue(userAtom);
  const isMe = user.username === username;
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
            <DashboardUserInfoCard />
            <DashboardLinkCard />
          </Row>
          <Row>
            <Col>
              <DashboardStackCard />
              <DashboardStatisticsCard />
              <DashboardGithubRepoCard />
            </Col>
            <DashboardHistoryCard />
          </Row>
        </Col>
      </Page.Main>
    </>
  );
}

export default Dashboard;
