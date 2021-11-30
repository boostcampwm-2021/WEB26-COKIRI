import { useState } from 'react';
import PropTypes from 'prop-types';

import Comment from 'src/components/Comment';
import ButtonCommon from 'src/components/buttons/Common';

import { CommentType } from 'src/types';

import { Wrapper } from './style';

interface Props {
  postID: string;
  comments: CommentType[];
  expanded: boolean;
  // eslint-disable-next-line no-unused-vars
  onCommentDelete: (commentID: string) => void;
  onExpand: VoidFunction;
}

function PostComments({ postID, comments, expanded, onCommentDelete, onExpand }: Props) {
  const [isExpand, setIsExpand] = useState(expanded);
  const isLong = comments.length > 2;
  const handleClick = () => {
    onExpand();
    setIsExpand(true);
  };
  return (
    <Wrapper>
      {isExpand
        ? comments.map((comment) => (
            <Comment
              key={comment._id}
              postID={postID}
              comment={comment}
              onCommentDelete={onCommentDelete}
            />
          ))
        : comments
            .slice(0, 2)
            .map((comment) => (
              <Comment
                key={comment._id}
                postID={postID}
                comment={comment}
                onCommentDelete={onCommentDelete}
              />
            ))}
      {!isExpand && isLong && (
        <ButtonCommon onClick={handleClick} title='more'>
          댓글 더보기
        </ButtonCommon>
      )}
    </Wrapper>
  );
}

PostComments.propTypes = {
  postID: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
  expanded: PropTypes.bool,
  onCommentDelete: PropTypes.func.isRequired,
  onExpand: PropTypes.func,
};

PostComments.defaultProps = {
  expanded: false,
  onExpand: () => {},
};

export default PostComments;
