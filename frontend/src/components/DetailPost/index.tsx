import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PostImages from 'src/components/images/PostImages';
import ProfileSet from 'src/components/sets/ProfileSet';
import LikeButton from 'src/components/buttons/LikeButton';
import CommentButton from 'src/components/buttons/CommentButton';
import EchoButton from 'src/components/buttons/EchoButton';
import LikesButton from 'src/components/buttons/LikesButton';
import PostContent from 'src/components/PostContent';
import PostComments from 'src/components/PostComments';
import CommentInput from 'src/components/inputs/CommentInput';
import { Row, Col } from 'src/components/Grid';

import {
  DETAIL_POST_IMAGE_WIDTH,
  DETAIL_POST_IMAGE_HEIGHT,
  DETAIL_COMMENT_INPUT_WIDTH,
  DETAIL_POST_CONTENT_WIDTH,
  DETAIL_COMMENT_ICON_SIZE,
  DETAIL_COMMENT_ICON_PADDING,
  DETAIL_PROFILE_SET_MARGIN_LEFT,
} from 'src/globals/constants';

import { PostType, CommentType } from 'src/types';

import { ImageSection, PostInfoSection } from './style';

interface Props {
  post: PostType;
}

function DetailPost({ post }: Props) {
  const [likeCount, setLikeCount] = useState(post.likes?.length ?? 0);
  const [comments, setComments] = useState<CommentType[]>([]);
  useEffect(() => {
    setComments(post.comments!);
  }, [post.comments]);
  const { _id, images, user, likes, content } = post;
  return (
    <Row>
      <ImageSection>
        <PostImages
          images={images!}
          width={DETAIL_POST_IMAGE_WIDTH}
          height={DETAIL_POST_IMAGE_HEIGHT}
        />
      </ImageSection>
      <PostInfoSection>
        <Col>
          <ProfileSet
            profileImage={user!.profileImage}
            username={user!.username!}
            marginLeft={DETAIL_PROFILE_SET_MARGIN_LEFT}
          />
          <Row justifyContent='space-evenly'>
            <LikeButton postID={_id!} postLikes={likes!} setLikeCount={setLikeCount} />
            <CommentButton postID={_id!} />
            <EchoButton postID={_id!} />
          </Row>
          {likeCount !== 0 && <LikesButton postID={_id!} likeCount={likeCount} />}
          <PostContent content={content!} width={DETAIL_POST_CONTENT_WIDTH} />
          <PostComments postID={_id!} comments={comments} />
          <CommentInput
            postID={_id!}
            setComments={setComments}
            width={DETAIL_COMMENT_INPUT_WIDTH}
            iconSize={DETAIL_COMMENT_ICON_SIZE}
            padding={DETAIL_COMMENT_ICON_PADDING}
          />
        </Col>
      </PostInfoSection>
    </Row>
  );
}

DetailPost.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailPost;
