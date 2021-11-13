import Button from 'src/components/buttons/Common';

import { FOLLOW_BUTTON_WIDTH, FOLLOW_BUTTON_HEIGHT } from 'src/globals/constants';

function FollowButton() {
  return (
    <Button width={FOLLOW_BUTTON_WIDTH} height={FOLLOW_BUTTON_HEIGHT}>
      팔로우
    </Button>
  );
}

export default FollowButton;
