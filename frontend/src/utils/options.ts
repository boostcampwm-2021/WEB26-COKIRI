import { theme } from 'src/styles';

const radarOption = {
  maintainAspectRatio: false,
  responsive: false,
  scales: {
    r: {
      ticks: {
        color: '#ffffff',
        backdropColor: theme.colors.background,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const pieOption = {
  maintainAspectRatio: false,
  responsive: false,
  radius: 80,
};

export { radarOption, pieOption };
