import CardCommon from 'src/components/cards/Common';
import { Row, Col } from 'src/components/Grid';

import {
  DASHBOARD_RIGHT_SECTION_CARD_WIDTH,
  DASHBOARD_LINK_ROW_PADDING,
} from 'src/globals/constants';

import { Title, Content } from './style';

function DashBoardLinkCard() {
  return (
    <CardCommon width={DASHBOARD_RIGHT_SECTION_CARD_WIDTH}>
      <Row padding={DASHBOARD_LINK_ROW_PADDING}>
        <Col>
          <Title>희망 직군</Title>
          <Title>GitHub</Title>
          <Title>Blog</Title>
        </Col>
        <Col>
          <p>:</p>
          <p>:</p>
          <p>:</p>
        </Col>
        <Col>
          <Content>놀고 먹는 개발자</Content>
          <Content>https://github.com/example</Content>
          <Content>링크</Content>
        </Col>
      </Row>
    </CardCommon>
  );
}

export default DashBoardLinkCard;