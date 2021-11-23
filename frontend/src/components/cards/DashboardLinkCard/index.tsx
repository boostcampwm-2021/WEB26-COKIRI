import PropTypes from 'prop-types';

import CardCommon from 'src/components/cards/Common';
import { Row, Col } from 'src/components/Grid';

import {
  DASHBOARD_RIGHT_SECTION_CARD_WIDTH,
  DASHBOARD_LINK_ROW_PADDING,
  DASHBOARD_LINK_COL_PADDING,
} from 'src/globals/constants';

import { DashboardType } from 'src/types';

interface Props {
  dashboard?: DashboardType;
}

function DashboardLinkCard({ dashboard }: Props) {
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
          <p>{dashboard?.jobObjectives?.reduce((prev, curr) => `${prev}, ${curr}`, '')}</p>
          <p>{dashboard?.github}</p>
          <p>{dashboard?.blog}</p>
        </Col>
      </Row>
    </CardCommon>
  );
}

DashboardLinkCard.propTypes = {
  dashboard: PropTypes.objectOf(PropTypes.any),
};

DashboardLinkCard.defaultProps = {
  dashboard: {},
};

export default DashboardLinkCard;
