import { useState } from 'react';
import PropTypes from 'prop-types';

import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import UsernameButton from 'src/components/buttons/UsernameButton';
import CommentLikeButton from 'src/components/buttons/CommentLikeButton';
import { Col, Row } from 'src/components/Grid';

import { DEFAULT_PROFILE_IMAGE } from 'src/globals/constants';

import { LikeType } from 'src/types';

interface Props {
  postID: string;
  commentID: string;
  commentLikes?: LikeType[];
  profileImage?: string;
  username: string;
  content: string;
}

function Comment({ postID, commentID, commentLikes, profileImage, username, content }: Props) {
  const [likeCount, setLikeCount] = useState(commentLikes!.length);
  return (
    <Col>
      <Row justifyContent='space-between'>
        <Row>
          <ProfileImageButton size={28} profileImage={profileImage} />
          <Col>
            <Row>
              <UsernameButton username={username} />
              <p>{content}</p>
            </Row>
            <Row>{likeCount !== 0 && <p>좋아요{likeCount}개</p>}</Row>
          </Col>
        </Row>
        <CommentLikeButton
          postID={postID}
          commentID={commentID}
          commentLikes={commentLikes!}
          setLikeCount={setLikeCount}
        />
      </Row>
    </Col>
  );
}

Comment.propTypes = {
  postID: PropTypes.string.isRequired,
  commentID: PropTypes.string.isRequired,
  commentLikes: PropTypes.arrayOf(PropTypes.any),
  profileImage: PropTypes.string,
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

Comment.defaultProps = {
  commentLikes: [],
  profileImage: DEFAULT_PROFILE_IMAGE,
};
export default Comment;
