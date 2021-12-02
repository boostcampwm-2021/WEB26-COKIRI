import PropTypes from 'prop-types';

import DeleteCommon from 'src/components/buttons/deletes/Common';

interface Props {
  jobObjective: string;
  onDeleteJobObjective: Function;
}

function JobObjectiveDeleteButton({ jobObjective, onDeleteJobObjective }: Props) {
  const handleClick = () => {
    onDeleteJobObjective(jobObjective);
  };
  return <DeleteCommon onClick={handleClick} content={jobObjective} />;
}

JobObjectiveDeleteButton.propTypes = {
  jobObjective: PropTypes.string.isRequired,
  onDeleteJobObjective: PropTypes.func.isRequired,
};

export default JobObjectiveDeleteButton;
