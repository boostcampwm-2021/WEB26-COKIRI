import CardCommon from 'src/components/cards/Common';
import { Row, Col } from 'src/components/Grid';

import {
  DASHBOARD_RIGHT_SECTION_CARD_WIDTH,
  DASHBOARD_LINK_ROW_PADDING,
  DASHBOARD_LINK_COL_PADDING,
} from 'src/globals/constants';

function DashBoardLinkCard() {
  return (
    <CardCommon width={DASHBOARD_RIGHT_SECTION_CARD_WIDTH}>
      <Row padding={DASHBOARD_LINK_ROW_PADDING}>
        <Col padding={DASHBOARD_LINK_COL_PADDING}>
          <p>희망 직군</p>
          <p>GitHub</p>
          <p>Blog</p>
        </Col>
        <Col padding={DASHBOARD_LINK_COL_PADDING}>
          <p>:</p>
          <p>:</p>
          <p>:</p>
        </Col>
        <Col padding={DASHBOARD_LINK_COL_PADDING}>
          <p>놀고 먹는 개발자</p>
          <p>https://github.com/example</p>
          <p>링크</p>
        </Col>
      </Row>
    </CardCommon>
  );
}

export default DashBoardLinkCard;
