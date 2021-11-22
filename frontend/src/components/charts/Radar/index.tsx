import { Radar } from 'react-chartjs-2';

import { theme } from 'src/styles';

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
  const options = {
    maintainAspectRatio: false,
    scales: {
      r: {
        ticks: {
          color: '#ffffff',
          backdropColor: theme.colors.background,
        },
      },
    },
  };

  return <Radar data={data} width={30} height={30} options={options} />;
}

export default RadarChart;
