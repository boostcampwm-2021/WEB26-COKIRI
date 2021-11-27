import styled from '@emotion/styled';

import { Card } from 'src/components/modals/Common/style';

import { NOTIFY_WIDTH, NOTIFY_HEIGHT } from 'src/globals/constants';

const PermissionDeniedNotifyCard = styled(Card)`
  font-size: 18px;
`;

function PermissionDeniedNotify() {
  return (
    <PermissionDeniedNotifyCard width={NOTIFY_WIDTH} height={NOTIFY_HEIGHT}>
      권한이 없습니다!
    </PermissionDeniedNotifyCard>
  );
}

export default PermissionDeniedNotify;
