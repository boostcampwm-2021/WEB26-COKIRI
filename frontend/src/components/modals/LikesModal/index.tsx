import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import Modal from 'src/components/modals/Common';
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

  return (
    <Wrapper>
      <Modal onClose={onClose} close='닫기'>
        좋아요
        <Col>
          {data?.map((like) => (
            <Row justifyContent='space-between' key={like.username}>
              <ProfileSet profileImage={like.profileImage} username={like.username} />
              <FollowButton targetUserID={like.username} />
            </Row>
          ))}
        </Col>
      </Modal>
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
