import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import CardCommon from 'src/components/cards/Common';
import DashboardHistoryAddButton from 'src/components/buttons/dashboardSettings/DashboardHistoryAddButton';

import { DASHBOARD_RIGHT_SECTION_CARD_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';

import { History, HorizentalLine } from './style';

interface Props {
  username: string;
}

function DashboardHistoryCard({ username }: Props) {
  const user = useRecoilValue(userAtom);
  const isMe = user.username === username;
  return (
    <CardCommon width={DASHBOARD_RIGHT_SECTION_CARD_WIDTH}>
      <History>
        <p>XXXX.XX.XX</p>
        <HorizentalLine />
        <p>example history</p>
        <p>XXXX.XX.XX</p>
        <HorizentalLine />
        <p>example history</p>
      </History>
      {isMe && <DashboardHistoryAddButton />}
    </CardCommon>
  );
}

DashboardHistoryCard.propTypes = {
  username: PropTypes.string.isRequired,
};

export default DashboardHistoryCard;
