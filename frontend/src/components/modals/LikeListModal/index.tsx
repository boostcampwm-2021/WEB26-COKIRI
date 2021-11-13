import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import Modal from 'src/components/modals/Common';
import ProfileSet from 'src/components/sets/ProfileSet';
import FollowButton from 'src/components/buttons/FollowButton';
import { Row, Col } from 'src/components/Grid';

import { PostType } from 'src/types';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import { Wrapper, Title } from './style';

interface Props {
  post: PostType;
  onClose: () => void;
}

function LikeListModal({ post, onClose }: Props) {
  const user = useRecoilValue(userAtom);
  const { data } = useQuery(['posts', post], () => Fetcher.getPostLikes(user, post));

  return (
    <Wrapper>
      <Modal onClose={onClose} close='닫기'>
        <Title>좋아요</Title>
        <Col>
          {data?.map((like) => {
            const image = like.profileImage ?? '';
            return (
              <Row justifyContent='space-between' key={like.username}>
                <ProfileSet image={image} username={like.username} />
                <FollowButton />
              </Row>
            );
          })}
        </Col>
      </Modal>
    </Wrapper>
  );
}

LikeListModal.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  onClose: PropTypes.func,
};

LikeListModal.defaultProps = {
  onClose: () => {},
};
export default LikeListModal;
