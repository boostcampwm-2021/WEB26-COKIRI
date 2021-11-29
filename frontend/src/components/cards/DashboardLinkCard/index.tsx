import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import CardCommon from 'src/components/cards/Common';
import DashboardLinkSettingButton from 'src/components/buttons/dashboardSettings/DashboardLinkSettingButton';
import { Row, Col } from 'src/components/Grid';

import { DASHBOARD_RIGHT_SECTION_CARD_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';
import dashboardUserInfoAtom from 'src/recoil/dashboardUserInfo';

import { Title, SubTitle, Content } from './style';

function DashboardLinkCard() {
  const router = useRouter();
  const username = router.query.username as string;
  const user = useRecoilValue(userAtom);
  const dashboardUserInfo = useRecoilValue(dashboardUserInfoAtom);
  const { jobObjectives, github, blog } = dashboardUserInfo;
  const isMe = user.username === username;

  return (
    <CardCommon width={DASHBOARD_RIGHT_SECTION_CARD_WIDTH}>
      <Row justifyContent='space-between'>
        <Title>Link</Title>
        {isMe && <DashboardLinkSettingButton />}
      </Row>
      <Row>
        <SubTitle>희망 직군</SubTitle>
        <Col>
          {jobObjectives?.map((jobObjective) => (
            <Content key={jobObjective}>{jobObjective}</Content>
          ))}
        </Col>
      </Row>
      <Row>
        <SubTitle>GitHub</SubTitle>
        <p>{github}</p>
      </Row>
      <Row>
        <SubTitle>Blog</SubTitle>
        <p>{blog}</p>
      </Row>
    </CardCommon>
  );
}

export default DashboardLinkCard;
