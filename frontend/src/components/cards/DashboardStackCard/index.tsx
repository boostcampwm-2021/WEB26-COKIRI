import CardCommon from 'src/components/cards/Common';

import { Col, Row } from 'src/components/Grid';

import { Title, Stack } from './style';

function DashBoardStackCard() {
  return (
    <CardCommon width={700}>
      <Col padding={8}>
        <Row padding={8}>
          <Col>
            <Title>프론트엔드</Title>
            <Row>
              <Stack>React</Stack>
            </Row>
          </Col>
        </Row>
        <Row padding={8}>
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
