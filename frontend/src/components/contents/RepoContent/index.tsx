import PropTypes from 'prop-types';

import ContentCommon from 'src/components/contents/Common';

import { DEFAULT_POST_CONTENT_WIDTH } from 'src/globals/constants';

interface Props {
  content: string;
  width?: number;
  expanded?: boolean;
}

function RepoContent({ content, width, expanded }: Props) {
  return <ContentCommon content={content} width={width} expanded={expanded} />;
}

RepoContent.propTypes = {
  content: PropTypes.string.isRequired,
  width: PropTypes.number,
  expanded: PropTypes.bool,
};

RepoContent.defaultProps = {
  width: DEFAULT_POST_CONTENT_WIDTH,
  expanded: false,
};

export default RepoContent;
