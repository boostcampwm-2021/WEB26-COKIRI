import PropTypes from 'prop-types';

import ContentCommon from 'src/components/contents/Common';

interface Props {
  content: string;
  expanded?: boolean;
}

function BaekjoonContent({ content, expanded }: Props) {
  return <ContentCommon content={content} expanded={expanded} />;
}

BaekjoonContent.propTypes = {
  content: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
};

BaekjoonContent.defaultProps = {
  expanded: false,
};

export default BaekjoonContent;
