import PropTypes from 'prop-types';

import CardCommon from 'src/components/cards/Common';
import { Row, Col } from 'src/components/Grid';

import {
  DASHBOARD_RIGHT_SECTION_CARD_WIDTH,
  DASHBOARD_LINK_ROW_PADDING,
  DASHBOARD_LINK_COL_PADDING,
} from 'src/globals/constants';

interface Props {
  jobObjectives: string[];
  github?: string;
  blog?: string;
}

function DashboardLinkCard({ jobObjectives, github, blog }: Props) {
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
          <p>{jobObjectives?.reduce((prev, curr) => `${prev}, ${curr}`, '')}</p>
          <p>{github}</p>
          <p>{blog}</p>
        </Col>
      </Row>
    </CardCommon>
  );
}

DashboardLinkCard.propTypes = {
  jobObjectives: PropTypes.arrayOf(PropTypes.string).isRequired,
  github: PropTypes.string,
  blog: PropTypes.string,
};

DashboardLinkCard.defaultProps = {
  github: '',
  blog: '',
};

export default DashboardLinkCard;
