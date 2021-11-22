import CardCommon from 'src/components/cards/Common';
import RadarChart from 'src/components/charts/Radar';

import {
  DASHBOARD_LEFT_SECTION_CARD_WIDTH,
  DASHBOARD_STATITICS_CARD_HEIGHT,
} from 'src/globals/constants';

function DashBoardStatisticsCard() {
  return (
    <CardCommon width={DASHBOARD_LEFT_SECTION_CARD_WIDTH} height={DASHBOARD_STATITICS_CARD_HEIGHT}>
      <RadarChart />
    </CardCommon>
  );
}

export default DashBoardStatisticsCard;
