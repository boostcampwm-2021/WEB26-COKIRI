import { useState } from 'react';
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

import { DashboardUserInfoType } from 'src/types';

import { Page } from 'src/styles';

import { Fetcher } from 'src/utils';

interface Props {
  data: DashboardUserInfoType;
  username: string;
}

function Dashboard({ data, username }: Props) {
  const [dashboardUserInfo, setDashboardUserInfo] = useState(data);

  const handleEditDashboardUserInfo = (newDashboardUserInfo: DashboardUserInfoType) => {
    setDashboardUserInfo(newDashboardUserInfo);
  };

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
            <DashboardUserInfoCard
              dashboardUserInfo={dashboardUserInfo}
              targetUserName={username}
              onEditDashboardUserInfo={handleEditDashboardUserInfo}
            />
            <DashboardLinkCard
              jobObjectives={dashboardUserInfo.jobObjectives}
              github={dashboardUserInfo.github!}
              blog={dashboardUserInfo.blog!}
            />
          </Row>
          <Row>
            <Col>
              <DashboardStackCard techStacks={dashboardUserInfo?.techStacks!} />
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
  const { data } = await Fetcher.getDashboardUserInfo(username);
  return { props: { data, username } };
}

export default Dashboard;
