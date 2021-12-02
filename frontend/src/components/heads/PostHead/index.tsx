import PropTypes from 'prop-types';

import HeadCommon from 'src/components/heads/common';

import { HEAD_CONTENT_MAX_LENGTH } from 'src/globals/constants';

interface Props {
  content: string;
  image?: string;
  postID: string;
}

function PostHead({ content, image, postID }: Props) {
  return (
    <HeadCommon
      title={`${content.substr(0, HEAD_CONTENT_MAX_LENGTH)}...`}
      image={image}
      path={`/posts/${postID}`}
      keywords={content.split(' ')}
      description={content}
    />
  );
}

PostHead.propTypes = {
  content: PropTypes.string.isRequired,
  postID: PropTypes.string.isRequired,
  image: PropTypes.string,
};

PostHead.defaultProps = {
  image: undefined,
};

export default PostHead;
