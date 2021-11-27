import { MutableSnapshot, RecoilRoot, useRecoilValue } from 'recoil';

import Header from 'src/components/Header';
import DashboardHead from 'src/components/heads/DashboardHead';
import DashboardBasicCard from 'src/components/cards/DashboardBasicCard';
import DashboardHistoryCard from 'src/components/cards/DashboardHistoryCard';
import DashboardLinkCard from 'src/components/cards/DashboardLinkCard';
import DashboardTeckStacksCard from 'src/components/cards/DashboardTechStacksCard';
import { Row, Col } from 'src/components/Grid';

import dashboardUserInfoAtom from 'src/recoil/dashboardUserInfo';
import userAtom from 'src/recoil/user';

import { DashboardUserInfoType, UserType } from 'src/types';

import { Page } from 'src/styles';

import { Fetcher } from 'src/utils';

interface Props {
  dashboardUserInfo: DashboardUserInfoType;
}

const initState =
  (dashboardUserInfo: DashboardUserInfoType, user: UserType) =>
  ({ set }: MutableSnapshot) => {
    set(dashboardUserInfoAtom, dashboardUserInfo);
    set(userAtom, user);
  };

function Dashboard({ dashboardUserInfo }: Props) {
  const { profileImage, username } = dashboardUserInfo;
  const user = useRecoilValue(userAtom);

  return (
    <>
      <DashboardHead username={username} profileImage={profileImage} />
      <Header />
      <Page.Main>
        <RecoilRoot initializeState={initState(dashboardUserInfo, user)}>
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
