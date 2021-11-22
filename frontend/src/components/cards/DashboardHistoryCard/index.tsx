import CardCommon from 'src/components/cards/Common';

import { DASHBOARD_RIGHT_SECTION_CARD_WIDTH } from 'src/globals/constants';

import { History, HorizentalLine } from './style';

function DashboardHistoryCard() {
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
    </CardCommon>
  );
}

export default DashboardHistoryCard;
