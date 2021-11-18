import { Dispatch, SetStateAction, useState } from 'react';
import PropTypes from 'prop-types';

import Comment from 'src/components/Comment';
import ButtonCommon from 'src/components/buttons/Common';

import { CommentType } from 'src/types';

import { Wrapper } from './style';

interface Props {
  postID: string;
  comments: CommentType[];
  expanded: boolean;
  setComments: Dispatch<SetStateAction<CommentType[]>>;
}

function PostComments({ postID, comments, expanded, setComments }: Props) {
  const [isExpand, setIsExpand] = useState(expanded);
  const isLong = comments.length > 2;
  const handleClick = () => {
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
              setComments={setComments}
            />
          ))
        : comments
            .slice(0, 2)
            .map((comment) => (
              <Comment
                key={comment._id}
                postID={postID}
                comment={comment}
                setComments={setComments}
              />
            ))}
      {!isExpand && isLong && <ButtonCommon onClick={handleClick}>댓글 더보기</ButtonCommon>}
    </Wrapper>
  );
}

PostComments.propTypes = {
  postID: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
  expanded: PropTypes.bool,
  setComments: PropTypes.func.isRequired,
};

PostComments.defaultProps = {
  expanded: false,
};

export default PostComments;
