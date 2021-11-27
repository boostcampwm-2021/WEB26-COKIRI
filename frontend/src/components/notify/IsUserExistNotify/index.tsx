import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { Card } from 'src/components/modals/Common/style';

import { NOTIFY_WIDTH, NOTIFY_HEIGHT } from 'src/globals/constants';

interface Props {
  username: string;
}

const IsUserExistNotifyCard = styled(Card)`
  font-size: 18px;
`;

function IsUserExistNotify({ username }: Props) {
  return (
    <IsUserExistNotifyCard width={NOTIFY_WIDTH} height={NOTIFY_HEIGHT}>
      <b>{username}</b>&nbsp;&nbsp;유저는 존재하지 않습니다!
    </IsUserExistNotifyCard>
  );
}

IsUserExistNotify.propTyps = {
  username: PropTypes.string,
};

export default IsUserExistNotify;
