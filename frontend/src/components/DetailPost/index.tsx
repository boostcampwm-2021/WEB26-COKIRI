import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoCloseCircleOutline } from 'react-icons/io5';

import PostImages from 'src/components/images/PostImages';
import ProfileSet from 'src/components/sets/ProfileSet';
import LikeButton from 'src/components/buttons/LikeButton';
import EchoButton from 'src/components/buttons/EchoButton';
import LikesButton from 'src/components/buttons/LikesButton';
import NormalContent from 'src/components/contents/NormalContent';
import PostComments from 'src/components/PostComments';
import CommentInput from 'src/components/inputs/CommentInput';
import NavigateIconButton from 'src/components/buttons/NavigateIconButton';
import { Row, Col } from 'src/components/Grid';

import {
  DETAIL_POST_IMAGE_WIDTH,
  DETAIL_POST_IMAGE_HEIGHT,
  DETAIL_COMMENT_INPUT_WIDTH,
  DETAIL_POST_CONTENT_WIDTH,
  DETAIL_COMMENT_ICON_SIZE,
  DETAIL_COMMENT_ICON_PADDING,
  DETAIL_PROFILE_SET_MARGIN_LEFT,
  RETURN_BUTTON_SIZE,
} from 'src/globals/constants';

import { PostType, CommentType } from 'src/types';

import { Wrapper, ImageSection, PostInfoSection } from './style';

interface Props {
  post: PostType;
}

function DetailPost({ post }: Props) {
  const [comments, setComments] = useState<CommentType[]>(post.comments!);
  const [likeCount, setLikeCount] = useState(post.likes!.length);
  const handleCommentWrite = (comment: CommentType) => {
    setComments((prevState: CommentType[]) => [...prevState, comment]);
  };
  const handleCommentDelete = (commentID: string) => {
    setComments((prevState: CommentType[]) =>
      [...prevState].filter((comment) => comment._id !== commentID),
    );
  };
  const { _id, images, user, likes, content } = post;
  const isImage = images!.length !== 0;
  return (
    <Wrapper isImage={isImage}>
      <NavigateIconButton href='/home' size={RETURN_BUTTON_SIZE} plain>
        <IoCloseCircleOutline />
      </NavigateIconButton>
      <ImageSection>
        <PostImages
          images={images!}
          width={DETAIL_POST_IMAGE_WIDTH}
          height={DETAIL_POST_IMAGE_HEIGHT}
          expanded
        />
      </ImageSection>
      <PostInfoSection>
        <Col>
          <Col overFlowY='auto'>
            <ProfileSet
              profileImage={user!.profileImage}
              username={user!.username!}
              marginLeft={DETAIL_PROFILE_SET_MARGIN_LEFT}
            />
            <Row justifyContent='space-evenly'>
              <LikeButton postID={_id!} postLikes={likes!} setLikeCount={setLikeCount} />
              <EchoButton postID={_id!} />
            </Row>
            {likeCount !== 0 && <LikesButton postID={post!._id!} likeCount={likeCount} />}
            <NormalContent content={content!} width={DETAIL_POST_CONTENT_WIDTH} expanded />
            <PostComments
              postID={_id!}
              comments={comments}
              expanded
              onCommentDelete={handleCommentDelete}
            />
          </Col>
          <CommentInput
            postID={_id!}
            onCommentWrite={handleCommentWrite}
            width={DETAIL_COMMENT_INPUT_WIDTH}
            iconSize={DETAIL_COMMENT_ICON_SIZE}
            padding={DETAIL_COMMENT_ICON_PADDING}
          />
        </Col>
      </PostInfoSection>
    </Wrapper>
  );
}

DetailPost.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailPost;
