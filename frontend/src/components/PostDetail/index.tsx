import { useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import { IoCloseCircleOutline } from 'react-icons/io5';

import PostImages from 'src/components/images/PostImages';
import ProfileSet from 'src/components/sets/ProfileSet';
import LikeButton from 'src/components/buttons/LikeButton';
import LikesButton from 'src/components/buttons/LikesButton';
import NormalContent from 'src/components/contents/NormalContent';
import PostComments from 'src/components/PostComments';
import CommentInput from 'src/components/inputs/CommentInput';
import IconButton from 'src/components/buttons/IconButton';
import { Row, Col } from 'src/components/Grid';

import {
  DETAIL_POST_IMAGE_WIDTH,
  DETAIL_POST_IMAGE_HEIGHT,
  DETAIL_PROFILE_SET_MARGIN_LEFT,
  RETURN_BUTTON_SIZE,
} from 'src/globals/constants';

import { PostType, CommentType } from 'src/types';

import { isAuthenticatedSelector } from 'src/recoil/user';

import { Wrapper, ImageSection, PostInfoSection } from './style';

interface Props {
  post: PostType;
}

function PostDetail({ post }: Props) {
  const router = useRouter();
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const { _id, images, user, likes, content } = post;

  const [comments, setComments] = useState(post.comments!);
  const [likeCount, setLikeCount] = useState(likes!.length);

  const handleCommentWrite = (comment: CommentType) => {
    setComments((prevState: CommentType[]) => [...prevState, comment]);
  };
  const handleCommentDelete = (commentID: string) => {
    setComments((prevState) => [...prevState].filter((comment) => comment._id !== commentID));
  };

  return (
    <Wrapper>
      <IconButton onClick={() => router.back()} size={RETURN_BUTTON_SIZE} plain>
        <IoCloseCircleOutline />
      </IconButton>
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
            {isAuthenticated && (
              <LikeButton postID={_id!} postLikes={likes!} setLikeCount={setLikeCount} />
            )}
            {likeCount !== 0 && <LikesButton postID={post!._id!} likeCount={likeCount} />}
            <NormalContent content={content!} expanded />
            <PostComments
              postID={_id!}
              comments={comments}
              expanded
              onCommentDelete={handleCommentDelete}
            />
          </Col>
          {isAuthenticated && <CommentInput postID={_id!} onCommentWrite={handleCommentWrite} />}
        </Col>
      </PostInfoSection>
    </Wrapper>
  );
}

PostDetail.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostDetail;
