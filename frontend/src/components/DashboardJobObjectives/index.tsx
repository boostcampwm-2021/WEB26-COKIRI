import PropTypes from 'prop-types';

import JobObjectiveDeleteButton from 'src/components/buttons/deletes/JobObjectiveDeleteButton';
import { Row, Col } from 'src/components/Grid';

import { Wrapper, Title } from './style';

interface Props {
  jobObjectives: string[];
  onDeleteJobObjective: Function;
}

function DashboardJobObjectives({ jobObjectives, onDeleteJobObjective }: Props) {
  return (
    <Wrapper>
      <Title>desired job</Title>
      <Col alignItems='flex-end'>
        {jobObjectives.map((jobObjective) => (
          <Row key={jobObjective} alignItems='center'>
            <p>{jobObjective}</p>
            <JobObjectiveDeleteButton
              jobObjective={jobObjective}
              onDeleteJobObjective={onDeleteJobObjective}
            />
          </Row>
        ))}
      </Col>
    </Wrapper>
  );
}

DashboardJobObjectives.propTypes = {
  jobObjectives: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDeleteJobObjective: PropTypes.func.isRequired,
};

export default DashboardJobObjectives;
