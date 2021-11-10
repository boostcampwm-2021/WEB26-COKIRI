import PropTypes from 'prop-types';

import PostLongContent from 'src/components/PostLongContent';

import { Wrapper } from './style';

interface Props {
  content: string;
}

function PostContent({ content }: Props) {
  return (
    <Wrapper>
      {content.length > 20 || content.split('\n').length > 1 ? (
        <PostLongContent content={content} />
      ) : (
        <>{content}</>
      )}
    </Wrapper>
  );
}

PostContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostContent;
