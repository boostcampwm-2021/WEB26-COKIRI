import PropTypes from 'prop-types';

import Comment from 'src/components/Comment';

import { CommentType } from 'src/types';

import { Wrapper } from './style';

interface Props {
  postID: string;
  comments: CommentType[];
}

function PostComments({ postID, comments }: Props) {
  return (
    <Wrapper>
      {comments.map((comment) => (
        <Comment key={comment._id} postID={postID} comment={comment} />
      ))}
    </Wrapper>
  );
}

PostComments.propTypes = {
  postID: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default PostComments;
