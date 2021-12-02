import PropTypes from 'prop-types';
import { BsPlusCircle } from 'react-icons/bs';

import IconButton from 'src/components/buttons/IconButton';

interface Props {
  onAddJobObjective: VoidFunction;
}

function JobObjectiveAddButton({ onAddJobObjective }: Props) {
  return (
    <IconButton onClick={onAddJobObjective} title='add'>
      <BsPlusCircle />
    </IconButton>
  );
}

JobObjectiveAddButton.propTypes = {
  onAddJobObjective: PropTypes.func.isRequired,
};

export default JobObjectiveAddButton;
