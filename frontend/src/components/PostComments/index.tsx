import { useState } from 'react';
import PropTypes from 'prop-types';

import Comment from 'src/components/Comment';
import ButtonCommon from 'src/components/buttons/Common';

import { CommentType } from 'src/types';

import { Wrapper } from './style';

interface Props {
  postID: string;
  comments?: CommentType[];
}

function PostComments({ postID, comments }: Props) {
  const [isExpand, setIsExpand] = useState(false);
  const isShort = comments!.length <= 2;
  const handleClick = () => {
    setIsExpand(true);
  };
  if (isShort) {
    return (
      <Wrapper>
        {comments!.map((comment) => (
          <Comment key={comment._id} postID={postID} comment={comment} />
        ))}
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {isExpand
        ? comments!.map((comment) => (
            <Comment key={comment._id} postID={postID} comment={comment} />
          ))
        : comments!
            .slice(0, 2)
            .map((comment) => <Comment key={comment._id} postID={postID} comment={comment} />)}
      {!isExpand && <ButtonCommon onClick={handleClick}>댓글 더보기</ButtonCommon>}
    </Wrapper>
  );
}

PostComments.propTypes = {
  postID: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.any),
};

PostComments.defaultProps = {
  comments: [],
};
export default PostComments;
