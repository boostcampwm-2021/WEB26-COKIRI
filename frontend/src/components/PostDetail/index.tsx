import React, { useState } from 'react';
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
import ExternalContent from 'src/components/contents/ExternalContent';
import { Row } from 'src/components/Grid';

import {
  DETAIL_POST_IMAGE_WIDTH,
  DETAIL_POST_IMAGE_HEIGHT,
  RETURN_BUTTON_SIZE,
} from 'src/globals/constants';

import { PostType, CommentType } from 'src/types';

import { isAuthenticatedSelector } from 'src/recoil/user';

import { Wrapper, ImageSection, PostInfoSection, CommentSection, Space } from './style';

interface Props {
  post: PostType;
}

function PostDetail({ post }: Props) {
  const router = useRouter();
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const { _id, images, user, likes, content, external } = post;

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
      <IconButton onClick={() => router.back()} size={RETURN_BUTTON_SIZE} plain title='back'>
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
        <Row>
          <ProfileSet profileImage={user!.profileImage} username={user!.username!} />
        </Row>
        {isAuthenticated && (
          <Row>
            <LikeButton postID={_id!} postLikes={likes!} setLikeCount={setLikeCount} />
            {likeCount !== 0 && <LikesButton postID={post!._id!} likeCount={likeCount} />}
          </Row>
        )}
        <NormalContent content={content!} expanded />
        {external !== undefined && <ExternalContent external={external} />}
        <PostComments
          postID={_id!}
          comments={comments}
          expanded
          onCommentDelete={handleCommentDelete}
        />
        <Space />
        <CommentSection>
          {isAuthenticated && <CommentInput postID={_id!} onCommentWrite={handleCommentWrite} />}
        </CommentSection>
      </PostInfoSection>
    </Wrapper>
  );
}

PostDetail.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostDetail;
