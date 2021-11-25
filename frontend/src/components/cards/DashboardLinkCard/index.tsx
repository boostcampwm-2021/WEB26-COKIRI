import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import CardCommon from 'src/components/cards/Common';
import DashboardLinkSettingButton from 'src/components/buttons/dashboardSettings/DashboardLinkSettingButton';
import { Row, Col } from 'src/components/Grid';

import { DASHBOARD_RIGHT_SECTION_CARD_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';
import dashboardUserInfoAtom from 'src/recoil/dashboardUserInfo';

import { Title, Content } from './style';

function DashboardLinkCard() {
  const router = useRouter();
  const username = router.query.username as string;
  const user = useRecoilValue(userAtom);
  const dashboardUserInfo = useRecoilValue(dashboardUserInfoAtom);
  const { jobObjectives, github, blog, solvedac } = dashboardUserInfo;
  const isMe = user.username === username;

  return (
    <CardCommon width={DASHBOARD_RIGHT_SECTION_CARD_WIDTH}>
      <Row justifyContent='space-between'>
        <Col>
          <Row>
            <Title>희망 직군</Title>
            <Col>
              {jobObjectives?.map((jobObjective) => (
                <Content key={jobObjective}>{jobObjective}</Content>
              ))}
            </Col>
          </Row>
          <Row>
            <Title>GitHub</Title>
            <p>{github}</p>
          </Row>
          <Row>
            <Title>Blog</Title>
            <p>{blog}</p>
          </Row>
          <Row>
            <Title>Solved.ac</Title>
            <p>{solvedac}</p>
          </Row>
        </Col>

        {isMe && <DashboardLinkSettingButton />}
      </Row>
    </CardCommon>
  );
}

export default DashboardLinkCard;
