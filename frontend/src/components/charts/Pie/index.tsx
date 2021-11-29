import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import {
  PIE_CHART_WIDTH,
  PIE_CHART_HEIGHT,
  HEXADECIMAL,
  COLOR_START_INDEX,
  COLOR_END_INDEX,
} from 'src/globals/constants';

import { pieOption } from 'src/utils/options';

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
    .map(
      () =>
        `#${(0x1000000 + Math.random() * 0xffffff)
          .toString(HEXADECIMAL)
          .substr(COLOR_START_INDEX, COLOR_END_INDEX)}`,
    );

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
  if (sortedLanguages.length === 0) {
    return null;
  }
  return <Pie data={data} width={PIE_CHART_WIDTH} height={PIE_CHART_HEIGHT} options={pieOption} />;
}

PieChart.propTypes = {
  statistics: PropTypes.objectOf(PropTypes.any),
};

PieChart.defaultProps = {
  statistics: {},
};

export default PieChart;
