import CardCommon from 'src/components/cards/Common';
import RadarChart from 'src/components/charts/Radar';

function DashBoardStatisticsCard() {
  return (
    <CardCommon width={700} height={200}>
      <RadarChart />
    </CardCommon>
  );
}

export default DashBoardStatisticsCard;
