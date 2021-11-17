import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
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

import { CommentType } from 'src/types';

import { Fetcher } from 'src/utils';

import { ImageSection, PostInfoSection } from './style';

interface Props {
  postID: string | string[];
}

function DetailPost({ postID }: Props) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const { isFetched, data: detailPost } = useQuery(['detail', 'posts', postID], () =>
    Fetcher.getDetailPost(postID),
  );
  useEffect(() => {
    setComments(detailPost?.comments ?? []);
  }, [detailPost]);
  const [likeCount, setLikeCount] = useState(detailPost?.likes?.length ?? 0);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isFetched && (
        <Row>
          <ImageSection>
            <PostImages
              images={detailPost?.images!}
              width={DETAIL_POST_IMAGE_WIDTH}
              height={DETAIL_POST_IMAGE_HEIGHT}
            />
          </ImageSection>
          <PostInfoSection>
            <Col>
              <ProfileSet
                profileImage={detailPost?.user!.profileImage}
                username={detailPost?.user!.username!}
                marginLeft={DETAIL_PROFILE_SET_MARGIN_LEFT}
              />
              <Row justifyContent='space-evenly'>
                <LikeButton
                  postID={detailPost?._id!}
                  postLikes={detailPost?.likes!}
                  setLikeCount={setLikeCount}
                />
                <CommentButton postID={detailPost?._id!} />
                <EchoButton postID={detailPost?._id!} />
              </Row>
              {likeCount !== 0 && <LikesButton postID={detailPost?._id!} likeCount={likeCount} />}
              <PostContent
                content={detailPost?.content!}
                width={DETAIL_POST_CONTENT_WIDTH}
                detail
              />
              <PostComments postID={detailPost?._id!} comments={comments} detail />
              <CommentInput
                postID={detailPost?._id!}
                setComments={setComments}
                width={DETAIL_COMMENT_INPUT_WIDTH}
                iconSize={DETAIL_COMMENT_ICON_SIZE}
                padding={DETAIL_COMMENT_ICON_PADDING}
              />
            </Col>
          </PostInfoSection>
        </Row>
      )}
    </>
  );
}

DetailPost.propTypes = {
  postID: PropTypes.string.isRequired,
};

export default DetailPost;
