import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PropTypes from 'prop-types';

import { theme } from 'src/styles';

interface Props {
  width: string;
  height: string;
  circle: boolean;
}

function SkeletonLoading({ width, height, circle }: Props) {
  return (
    <SkeletonTheme
      baseColor={theme.colors.background}
      highlightColor={theme.colors.loadingHighlight}
    >
      <Skeleton circle={circle} width={width} height={height} />
    </SkeletonTheme>
  );
}

SkeletonLoading.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  circle: PropTypes.bool,
};

SkeletonLoading.defaultProps = {
  circle: false,
};

export default SkeletonLoading;
