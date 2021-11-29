import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import { PIE_CHART_WIDTH, PIE_CHART_HEIGHT } from 'src/globals/constants';

interface Props {
  statistics?: { [key: string]: number };
}

const compareLanguages = (
  [, firstPercentage]: [string, number],
  [, secondPercentage]: [string, number],
) => secondPercentage - firstPercentage;

const makeRandomColors = (number: number) =>
  Array(number)
    .fill(null)
    .map(() => `#${(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)}`);

function PieChart({ statistics }: Props) {
  const sortedLanguages = Object.entries(statistics!).sort(compareLanguages);

  const data = {
    labels: sortedLanguages.map(([language]: [string, number]) => language),
    datasets: [
      {
        label: 'Language Statistics',
        data: sortedLanguages.map(([, percentage]: [string, number]) => percentage),
        fill: true,
        backgroundColor: makeRandomColors(sortedLanguages.length),
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    radius: 80,
  };

  return <Pie data={data} width={PIE_CHART_WIDTH} height={PIE_CHART_HEIGHT} options={options} />;
}

PieChart.propTypes = {
  statistics: PropTypes.objectOf(PropTypes.any),
};

PieChart.defaultProps = {
  statistics: {},
};

export default PieChart;
