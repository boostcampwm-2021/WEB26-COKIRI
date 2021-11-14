import PropTypes from 'prop-types';

import PostLongContent from 'src/components/PostLongContent';

import { POST_CONTENT_ONE_LINE_LENGTH } from 'src/globals/constants';

import { Wrapper } from './style';

interface Props {
  content: string;
}

function PostContent({ content }: Props) {
  const isOverLine =
    content.length > POST_CONTENT_ONE_LINE_LENGTH || content.split('\n').length > 1;
  return <Wrapper>{isOverLine ? <PostLongContent content={content} /> : <p>{content}</p>}</Wrapper>;
}

PostContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostContent;
