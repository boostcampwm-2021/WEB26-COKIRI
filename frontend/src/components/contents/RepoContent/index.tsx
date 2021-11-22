import PropTypes from 'prop-types';

interface Props {
  content: string;
}

function RepoContent({ content }: Props) {
  return <>todo</>;
}

RepoContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default RepoContent;
