import PropTypes from 'prop-types';

import HeadCommon from 'src/components/heads/common';

interface Props {
  content: string;
  image?: string;
  postID: string;
}

function PostHead({ content, image, postID }: Props) {
  return (
    <HeadCommon
      title={`${content.substr(0, 20)}...`}
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
