import PropTypes from 'prop-types';

import CardCommon from 'src/components/cards/Common';
import { Col, Row } from 'src/components/Grid';

import {
  DASHBOARD_LEFT_SECTION_CARD_WIDTH,
  DASHBOARD_STACK_GRID_PADDING,
} from 'src/globals/constants';

import { StackType } from 'src/types';

import { Title, Stack } from './style';

interface Props {
  techStacks: { [field: string]: StackType[] };
}

function DashboardStackCard({ techStacks }: Props) {
  const fields = Object.keys(techStacks!);
  return (
    <CardCommon width={DASHBOARD_LEFT_SECTION_CARD_WIDTH}>
      <Col padding={DASHBOARD_STACK_GRID_PADDING}>
        <Row padding={DASHBOARD_STACK_GRID_PADDING}>
          {fields.map((field) => (
            <Col>
              <Title>{field}</Title>
              <Row>
                {techStacks[field].map((stack) => (
                  <Stack color={stack.color}>{stack.techStack}</Stack>
                ))}
              </Row>
            </Col>
          ))}
        </Row>
      </Col>
    </CardCommon>
  );
}

DashboardStackCard.propTypes = {
  techStacks: PropTypes.objectOf(PropTypes.any),
};

DashboardStackCard.defaultProps = {
  techStacks: {},
};

export default DashboardStackCard;
