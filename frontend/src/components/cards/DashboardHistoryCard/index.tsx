import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import CardCommon from 'src/components/cards/Common';
import HistoryAddButton from 'src/components/buttons/dashboardSettings/HistoryAddButton';

import { DASHBOARD_RIGHT_SECTION_CARD_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';

import { History, HorizentalLine } from './style';

interface Props {
  username: string;
}

function DashboardHistoryCard({ username }: Props) {
  const user = useRecoilValue(userAtom);
  const hidden = user.username !== username;
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
      <HistoryAddButton hidden={hidden} />
    </CardCommon>
  );
}

DashboardHistoryCard.propTypes = {
  username: PropTypes.string.isRequired,
};

export default DashboardHistoryCard;
