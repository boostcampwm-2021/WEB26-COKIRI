import { Radar } from 'react-chartjs-2';

import { RADAR_CHART_WIDTH, RADAR_CHART_HEIGHT } from 'src/globals/constants';

import { options } from 'src/utils';

function RadarChart() {
  const data = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  return (
    <Radar
      data={data}
      width={RADAR_CHART_WIDTH}
      height={RADAR_CHART_HEIGHT}
      options={options.RadarOptions}
    />
  );
}

export default RadarChart;
