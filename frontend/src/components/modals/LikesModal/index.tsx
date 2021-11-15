import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import ModalCommon from 'src/components/modals/Common';
import ProfileSet from 'src/components/sets/ProfileSet';
import FollowButton from 'src/components/buttons/FollowButton';
import { Row, Col } from 'src/components/Grid';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import { Wrapper } from './style';

interface Props {
  postID: string;
  onClose: () => void;
}

function LikesModal({ postID, onClose }: Props) {
  const user = useRecoilValue(userAtom);
  const { data } = useQuery(['posts', postID], () => Fetcher.getPostLikes(user, postID));

  const isFollowButton = (targetUserID: string) =>
    !(user.follows!.some((follow) => follow === targetUserID) || targetUserID === user._id);

  return (
    <Wrapper>
      <ModalCommon onClose={onClose} close='닫기'>
        좋아요
        <Col>
          {data?.map((like) => {
            const targetUserID = like.user._id!;
            return (
              <Row justifyContent='space-between' key={like.user.username}>
                <ProfileSet profileImage={like.profileImage} username={like.user.username} />
                {isFollowButton(targetUserID) && <FollowButton targetUserID={targetUserID} />}
              </Row>
            );
          })}
        </Col>
      </ModalCommon>
    </Wrapper>
  );
}

LikesModal.propTypes = {
  postID: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

LikesModal.defaultProps = {
  onClose: () => {},
};
export default LikesModal;
