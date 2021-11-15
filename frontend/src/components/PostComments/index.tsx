import PropTypes from 'prop-types';

import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import UsernameButton from 'src/components/buttons/UsernameButton';
import { Row } from 'src/components/Grid';

import { CommentType } from 'src/types';

import { Wrapper } from './style';

interface Props {
  comments: CommentType[];
}

// eslint-disable-next-line no-unused-vars
function PostComments({ comments }: Props) {
  return (
    <Wrapper>
      {comments.map((comment) => (
        <Row key={comment._id}>
          <ProfileImageButton size={28} profileImage={comment.user.profileImage} />
          <UsernameButton username={comment.user.username!} />
          <p>{comment.content}</p>
        </Row>
      ))}
    </Wrapper>
  );
}

PostComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default PostComments;
