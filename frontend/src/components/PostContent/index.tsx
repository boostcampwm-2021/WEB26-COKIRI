import PropTypes from 'prop-types';

import PostLongContent from 'src/components/PostLongContent';

import { Wrapper } from './style';

interface Props {
  content: string;
}

function PostContent({ content }: Props) {
  const isOverLine = content.length > 20 || content.split('\n').length > 1;
  return (
    <Wrapper>{isOverLine ? <PostLongContent content={content} /> : <div>{content}</div>}</Wrapper>
  );
}

PostContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostContent;
