import PropTypes from 'prop-types';

import { CommentType } from 'src/types';

import { Wrapper } from './style';

interface Props {
  comments: CommentType[];
}

// eslint-disable-next-line no-unused-vars
function PostComments({ comments }: Props) {
  return <Wrapper />;
}

PostComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default PostComments;
