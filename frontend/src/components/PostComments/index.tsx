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
        <Comment
          key={comment._id}
          postID={postID}
          commentID={comment._id}
          commentLikes={comment.likes}
          profileImage={comment.user.profileImage}
          username={comment.user.username!}
          content={comment.content}
        />
      ))}
    </Wrapper>
  );
}

PostComments.propTypes = {
  postID: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default PostComments;
