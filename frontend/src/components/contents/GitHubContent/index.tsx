import PropTypes from 'prop-types';

import ContentCommon from 'src/components/contents/Common';

interface Props {
  content: string;
  expanded?: boolean;
}

function GitHubContent({ content, expanded }: Props) {
  return <ContentCommon content={content} expanded={expanded} />;
}

GitHubContent.propTypes = {
  content: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
};

GitHubContent.defaultProps = {
  expanded: false,
};

export default GitHubContent;
