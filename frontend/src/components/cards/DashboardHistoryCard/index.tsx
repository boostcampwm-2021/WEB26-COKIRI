import CardCommon from 'src/components/cards/Common';

import { History, HorizentalLine } from './style';

function DashboardHistoryCard() {
  return (
    <CardCommon width={400}>
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
