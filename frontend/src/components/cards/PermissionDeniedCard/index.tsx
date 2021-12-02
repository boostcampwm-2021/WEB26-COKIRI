import CardCommon from 'src/components/cards/Common';

import { NOTIFY_CARD_WIDTH, NOTIFY_CARD_HEIGHT } from 'src/globals/constants';

import { Wrapper } from './style';

function PermissionDeniedCard() {
  return (
    <Wrapper>
      <CardCommon width={NOTIFY_CARD_WIDTH} height={NOTIFY_CARD_HEIGHT}>
        권한이 없습니다!
      </CardCommon>
    </Wrapper>
  );
}

export default PermissionDeniedCard;
