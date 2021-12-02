import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

import CardCommon from 'src/components/cards/Common';

import { NOTIFY_CARD_WIDTH, NOTIFY_CARD_HEIGHT } from 'src/globals/constants';

import userAtom, { isRegisteredSelector } from 'src/recoil/user';

import NavigateIconButton from 'src/components/buttons/NavigateIconButton';
import { Wrapper, Bold } from './style';

function UserNotFoundCard() {
  const user = useRecoilValue(userAtom);
  const isRegistered = useRecoilValue(isRegisteredSelector);

  const router = useRouter();
  const { username } = router.query;

  return (
    <Wrapper>
      <CardCommon width={NOTIFY_CARD_WIDTH} height={NOTIFY_CARD_HEIGHT}>
        <Bold>{username}</Bold> 는 존재하지 않습니다!
        {isRegistered && (
          <NavigateIconButton href={`/users/${user.username}`} title='my-profile'>
            내 프로필로 가기
          </NavigateIconButton>
        )}
      </CardCommon>
    </Wrapper>
  );
}

export default UserNotFoundCard;
