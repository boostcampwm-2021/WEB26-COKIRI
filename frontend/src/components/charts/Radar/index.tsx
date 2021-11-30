import { Radar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import { PIE_CHART_WIDTH, PIE_CHART_HEIGHT } from 'src/globals/constants';

import { radarOption } from 'src/utils/options';

interface Props {
  statistics: { [key: string]: number };
}

function RadarChart({ statistics }: Props) {
  const problems = Object.keys(statistics);
  const data = {
    labels: problems,
    datasets: [
      {
        label: 'Solvedac Statistics',
        data: problems.map((problem) => statistics[problem]),
        fill: true,
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
    ],
  };
  if (problems.length === 0) {
    return null;
  }
  return (
    <Radar data={data} width={PIE_CHART_WIDTH} height={PIE_CHART_HEIGHT} options={radarOption} />
  );
}

RadarChart.propTypes = {
  statistics: PropTypes.objectOf(PropTypes.any),
};

RadarChart.defaultProps = {
  statistics: {},
};

export default RadarChart;
