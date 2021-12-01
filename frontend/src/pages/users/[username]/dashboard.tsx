import { MutableSnapshot, RecoilRoot } from 'recoil';

import Header from 'src/components/Header';
import RegisterModal from 'src/components/modals/RegisterModal';
import DashboardHead from 'src/components/heads/DashboardHead';
import DashboardBasicCard from 'src/components/cards/DashboardBasicCard';
import DashboardHistoryCard from 'src/components/cards/DashboardHistoryCard';
import DashboardLinkCard from 'src/components/cards/DashboardLinkCard';
import DashboardRepoCard from 'src/components/cards/DashboardRepoCard';
import { Row, Col } from 'src/components/Grid';

import dashboardUserInfoAtom from 'src/recoil/dashboardUserInfo';
import userAtom from 'src/recoil/user';

import { DashboardUserInfoType, UserType } from 'src/types';

import { Page } from 'src/styles';

import { Fetcher } from 'src/utils';
import dynamic from 'next/dynamic';

const DashboardStatisticsCard = dynamic(
  () => import('src/components/cards/DashboardStatisticsCard'),
);
const DashboardTechStacksCard = dynamic(
  () => import('src/components/cards/DashboardTechStacksCard'),
);

interface Props {
  user?: UserType;
  dashboardUserInfo: DashboardUserInfoType;
}

const initState =
  (dashboardUserInfo: DashboardUserInfoType, user: UserType) =>
  ({ set }: MutableSnapshot) => {
    set(dashboardUserInfoAtom, dashboardUserInfo);
    set(userAtom, user);
  };

function Dashboard({ user, dashboardUserInfo }: Props) {
  const { profileImage, username } = dashboardUserInfo;

  return (
    <>
      <DashboardHead username={username} profileImage={profileImage} />
      <RecoilRoot initializeState={initState(dashboardUserInfo, user ?? {})}>
        <Header />
        <Page.Main>
          <Col alignItems='center'>
            <Row>
              <DashboardBasicCard />
              <DashboardLinkCard />
            </Row>
            <Row>
              <Col>
                <DashboardTechStacksCard />
                <DashboardStatisticsCard />
                <DashboardRepoCard />
              </Col>
              <DashboardHistoryCard />
            </Row>
          </Col>
        </Page.Main>
        <RegisterModal />
      </RecoilRoot>
    </>
  );
}

Dashboard.defaultProps = {
  user: undefined,
};

export async function getServerSideProps({ req, query }: any) {
  const props: { user?: UserType; dashboardUserInfo?: DashboardUserInfoType } = {};
  const { username } = query;
  const dashboardUserInfoRequest = await Fetcher.getDashboardUserInfo(username);
  const token = req.headers.cookie?.split('=')[1];
  if (token !== undefined) {
    const userRequest = Fetcher.getUsersMe(token);
    props.user = { ...(await userRequest), token };
  }
  props.dashboardUserInfo = await dashboardUserInfoRequest;
  return { props };
}

export default Dashboard;
