import { MutableSnapshot, RecoilRoot } from 'recoil';

import Header from 'src/components/Header';
import DashboardHead from 'src/components/heads/DashboardHead';
import DashboardBasicCard from 'src/components/cards/DashboardBasicCard';
import DashboardHistoryCard from 'src/components/cards/DashboardHistoryCard';
import DashboardLinkCard from 'src/components/cards/DashboardLinkCard';
import DashboardTeckStacksCard from 'src/components/cards/DashboardTechStacksCard';
import { Row, Col } from 'src/components/Grid';

import dashboardUserInfoAtom from 'src/recoil/dashboardUserInfo';

import { DashboardUserInfoType } from 'src/types';

import { Page } from 'src/styles';

import { Fetcher } from 'src/utils';

interface Props {
  dashboardUserInfo: DashboardUserInfoType;
}

const initState =
  (dashboardUserInfo: DashboardUserInfoType) =>
  ({ set }: MutableSnapshot) =>
    set(dashboardUserInfoAtom, dashboardUserInfo);

function Dashboard({ dashboardUserInfo }: Props) {
  const { profileImage, username } = dashboardUserInfo;
  return (
    <>
      <DashboardHead username={username} profileImage={profileImage} />
      <Header />
      <Page.Main>
        <RecoilRoot initializeState={initState(dashboardUserInfo)}>
          <Col alignItems='center'>
            <Row>
              <DashboardBasicCard />
              <DashboardLinkCard />
            </Row>
            <Row>
              <Col>
                <DashboardTeckStacksCard />
              </Col>
              <DashboardHistoryCard />
            </Row>
          </Col>
        </RecoilRoot>
      </Page.Main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { username } = context.query;
  try {
    const { data: dashboardUserInfo } = await Fetcher.getDashboardUserInfo(username);
    return {
      props: { dashboardUserInfo },
    };
  } catch (error) {
    return {
      props: { dashboardUserInfo: { username: '' } },
    };
  }
}

export default Dashboard;
