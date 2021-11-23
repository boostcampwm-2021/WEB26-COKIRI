import CardCommon from 'src/components/cards/Common';

import { Col, Row } from 'src/components/Grid';

import {
  DASHBOARD_LEFT_SECTION_CARD_WIDTH,
  DASHBOARD_STACK_GRID_PADDING,
} from 'src/globals/constants';

import { Title, Stack } from './style';

function DashBoardStackCard() {
  return (
    <CardCommon width={DASHBOARD_LEFT_SECTION_CARD_WIDTH}>
      <Col padding={DASHBOARD_STACK_GRID_PADDING}>
        <Row padding={DASHBOARD_STACK_GRID_PADDING}>
          <Col>
            <Title>프론트엔드</Title>
            <Row>
              <Stack>React</Stack>
            </Row>
          </Col>
        </Row>
        <Row padding={DASHBOARD_STACK_GRID_PADDING}>
          <Col>
            <Title>백엔드</Title>
            <Row>
              <Stack>Express</Stack>
            </Row>
          </Col>
        </Row>
      </Col>
    </CardCommon>
  );
}

export default DashBoardStackCard;
