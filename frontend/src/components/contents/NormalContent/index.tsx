import PropTypes from 'prop-types';

import ContentCommon from 'src/components/contents/Common';

interface Props {
  content: string;
  expanded?: boolean;
}

function NormalContent({ content, expanded }: Props) {
  return <ContentCommon content={content} expanded={expanded} />;
}

NormalContent.propTypes = {
  content: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
};

NormalContent.defaultProps = {
  expanded: false,
};

export default NormalContent;
