import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import CardCommon from 'src/components/cards/Common';
import DashboardTechStacksSettingButton from 'src/components/buttons/dashboardSettings/DashboardTechStacksSettingButton';
import { Col, Row } from 'src/components/Grid';

import { DASHBOARD_LEFT_SECTION_CARD_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';
import { dashboardTechStacksSelector } from 'src/recoil/dashboardUserInfo';

import { Title, SubTitle, Stack, Field } from './style';

function DashboardTechStacksCard() {
  const router = useRouter();
  const username = router.query.username as string;
  const user = useRecoilValue(userAtom);
  const isMe = user.username === username;
  const dashboardTechStacks = useRecoilValue(dashboardTechStacksSelector);
  const fields = Object.keys(dashboardTechStacks);

  return (
    <CardCommon width={DASHBOARD_LEFT_SECTION_CARD_WIDTH}>
      <Col>
        <Row justifyContent='space-between'>
          <Title>Tech Stacks</Title>
          {isMe && <DashboardTechStacksSettingButton />}
        </Row>
        {fields.map((field) => (
          <Field key={field}>
            <SubTitle>{field}</SubTitle>
            <Row>
              {dashboardTechStacks[field].map((stack) => (
                <Stack color={stack.color!} key={stack.techStack}>
                  {stack.techStack}
                </Stack>
              ))}
            </Row>
          </Field>
        ))}
      </Col>
    </CardCommon>
  );
}

export default DashboardTechStacksCard;
