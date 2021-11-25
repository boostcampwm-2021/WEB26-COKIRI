import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import ModalCommon from 'src/components/modals/Common';
import ProfileSet from 'src/components/sets/ProfileSet';
import FollowSet from 'src/components/sets/FollowSet';
import { Row } from 'src/components/Grid';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import { Likes, Like } from './style';

interface Props {
  postID: string;
  onClose: () => void;
}

function LikesModal({ postID, onClose }: Props) {
  const user = useRecoilValue(userAtom);
  const { data } = useQuery(['posts', 'likes', postID], () => Fetcher.getPostLikes(user, postID));

  return (
    <ModalCommon onClose={onClose} close='닫기' title='좋아하는 사람'>
      <Likes>
        {data?.map((like) => (
          <Like>
            <Row justifyContent='space-between' key={like.user.username}>
              <ProfileSet profileImage={like.user.profileImage} username={like.user.username!} />
              <FollowSet targetUserID={like.user._id!} />
            </Row>
          </Like>
        ))}
      </Likes>
    </ModalCommon>
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
