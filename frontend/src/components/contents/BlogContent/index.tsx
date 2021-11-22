import PropTypes from 'prop-types';

import ContentCommon from 'src/components/contents/Common';

interface Props {
  content: string;
  expanded?: boolean;
}

function BlogContent({ content, expanded }: Props) {
  return <ContentCommon content={content} expanded={expanded} />;
}

BlogContent.propTypes = {
  content: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
};

BlogContent.defaultProps = {
  expanded: false,
};

export default BlogContent;
