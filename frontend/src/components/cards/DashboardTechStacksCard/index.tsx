import { useRecoilValue } from 'recoil';

import CardCommon from 'src/components/cards/Common';
import DashboardTechStacksSettingButton from 'src/components/buttons/dashboardSettings/DashboardTechStacksSettingButton';
import { Col, Row } from 'src/components/Grid';

import {
  DASHBOARD_LEFT_SECTION_CARD_WIDTH,
  DASHBOARD_STACK_GRID_PADDING,
} from 'src/globals/constants';

import { dashboardTechStacksSelector } from 'src/recoil/dashboardUserInfo';

import { Title, Stack, Field } from './style';

function DashboardTechStacksCard() {
  const dashboardTechStacks = useRecoilValue(dashboardTechStacksSelector);
  const fields = Object.keys(dashboardTechStacks);

  return (
    <CardCommon width={DASHBOARD_LEFT_SECTION_CARD_WIDTH}>
      <Row justifyContent='space-between'>
        <Col padding={DASHBOARD_STACK_GRID_PADDING}>
          {fields.map((field) => (
            <Field key={field}>
              <Title>{field}</Title>
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
        <DashboardTechStacksSettingButton />
      </Row>
    </CardCommon>
  );
}

export default DashboardTechStacksCard;
