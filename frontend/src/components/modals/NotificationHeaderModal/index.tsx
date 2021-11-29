import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

import HeaderModal from 'src/components/modals/HeaderModal';
import FollowSet from 'src/components/sets/FollowSet';
import TimeFromNow from 'src/components/TimeFromNow';
import ProfileSet from 'src/components/sets/ProfileSet';
import NavigateIconButton from 'src/components/buttons/NavigateIconButton';
import { Row, Spacer } from 'src/components/Grid';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import { Background, Notification } from './style';

interface Props {
  onClose: VoidFunction;
}
const typeMessages: { [type: string]: string } = {
  postLike: '님이 내 글을 좋아해요',
  postComment: '님이 내 글에 코멘트를 남겼어요',
  commentLike: '님이 내 코멘트를 좋아해요',
  follow: '님이 나를 팔로우 하기 시작했어요',
};

function NotificationHeaderModal({ onClose }: Props) {
  const user = useRecoilValue(userAtom);
  const { data: notifications } = useQuery(['notifications', user._id], () =>
    Fetcher.getUserNotifications(user),
  );

  return (
    <>
      <Background onClick={onClose} />
      <HeaderModal right width={580}>
        {(notifications ?? []).map(({ _id, type, user: targetUser, postID, createdAt }) => (
          <Notification key={_id}>
            <Row justifyContent='space-between' alignItems='center'>
              <ProfileSet username={targetUser.username!} profileImage={targetUser.profileImage} />
              {typeMessages[type]}
              <Spacer />
              <TimeFromNow time={createdAt} />
              {postID && (
                <NavigateIconButton href={`/posts/${postID}`}>바로가기</NavigateIconButton>
              )}
              <FollowSet targetUserID={targetUser._id!} />
            </Row>
          </Notification>
        ))}
      </HeaderModal>
    </>
  );
}

NotificationHeaderModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NotificationHeaderModal;
