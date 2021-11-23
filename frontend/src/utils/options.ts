import { theme } from 'src/styles';

const RadarOptions = {
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

// eslint-disable-next-line import/prefer-default-export
export { RadarOptions };
