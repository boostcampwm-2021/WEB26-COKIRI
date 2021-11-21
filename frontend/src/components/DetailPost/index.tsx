import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { IoCloseCircleOutline } from 'react-icons/io5';

import PostImages from 'src/components/images/PostImages';
import ProfileSet from 'src/components/sets/ProfileSet';
import LikeButton from 'src/components/buttons/LikeButton';
import CommentButton from 'src/components/buttons/CommentButton';
import EchoButton from 'src/components/buttons/EchoButton';
import LikesButton from 'src/components/buttons/LikesButton';
import PostContent from 'src/components/PostContent';
import PostComments from 'src/components/PostComments';
import CommentInput from 'src/components/inputs/CommentInput';
import LoadingIndicator from 'src/components/LoadingIndicator';
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

import { CommentType } from 'src/types';

import { Fetcher } from 'src/utils';

import { Wrapper, ImageSection, PostInfoSection } from './style';

interface Props {
  postID: string;
}

function DetailPost({ postID }: Props) {
  const { isLoading, data: post } = useQuery(['detail', 'posts', postID], () =>
    Fetcher.getDetailPost(postID),
  );
  const [comments, setComments] = useState<CommentType[]>(post?.comments! ?? []);
  const [likeCount, setLikeCount] = useState(post?.likes!.length ?? 0);
  const handleCommentWrite = (comment: CommentType) => {
    setComments((prevState: CommentType[]) => [...prevState, comment]);
  };
  const handleCommentDelete = (commentID: string) => {
    setComments((prevState: CommentType[]) =>
      [...prevState].filter((comment) => comment._id !== commentID),
    );
  };
  useEffect(() => {
    if (!isLoading) {
      setComments(post?.comments!);
      setLikeCount(post?.likes!.length!);
    }
  }, [isLoading, post]);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  const isImage = post!.images!.length !== 0;
  return (
    <Wrapper isImage={isImage}>
      <NavigateIconButton href='/home' size={RETURN_BUTTON_SIZE} plain>
        <IoCloseCircleOutline />
      </NavigateIconButton>
      <ImageSection>
        <PostImages
          images={post!.images!}
          width={DETAIL_POST_IMAGE_WIDTH}
          height={DETAIL_POST_IMAGE_HEIGHT}
          expanded
        />
      </ImageSection>
      <PostInfoSection>
        <Col>
          <Col overFlowY='auto'>
            <ProfileSet
              profileImage={post!.user!.profileImage}
              username={post!.user!.username!}
              marginLeft={DETAIL_PROFILE_SET_MARGIN_LEFT}
            />
            <Row justifyContent='space-evenly'>
              <LikeButton
                postID={post!._id!}
                postLikes={post!.likes!}
                setLikeCount={setLikeCount}
              />
              <CommentButton postID={post!._id!} />
              <EchoButton postID={post!._id!} />
            </Row>
            {likeCount !== 0 && <LikesButton postID={post!._id!} likeCount={likeCount} />}
            <PostContent content={post!.content!} width={DETAIL_POST_CONTENT_WIDTH} expanded />
            <PostComments
              postID={post!._id!}
              comments={comments}
              expanded
              onCommentDelete={handleCommentDelete}
            />
          </Col>
          <CommentInput
            postID={post!._id!}
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
  postID: PropTypes.string.isRequired,
};

export default DetailPost;
