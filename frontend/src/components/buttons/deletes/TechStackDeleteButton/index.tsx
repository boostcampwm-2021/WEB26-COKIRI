import PropTypes from 'prop-types';

import DeleteCommon from 'src/components/buttons/deletes/Common';

interface Props {
  techStack: string;
  field: string;
  onDeleteTechStack: Function;
}

function TechStackDeleteButton({ techStack, field, onDeleteTechStack }: Props) {
  const handleClick = () => {
    onDeleteTechStack(field, techStack);
  };
  return <DeleteCommon onClick={handleClick} content={techStack} />;
}

TechStackDeleteButton.propTypes = {
  techStack: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  onDeleteTechStack: PropTypes.func.isRequired,
};

export default TechStackDeleteButton;
