import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PropTypes from 'prop-types';

interface Props {
  width: string | number;
  height: string | number;
  circle: boolean;
}

function SkeletonLoading({ width, height, circle }: Props) {
  return (
    <SkeletonTheme baseColor='#444444' highlightColor='#555555'>
      <Skeleton circle={circle} width={width} height={height} />
    </SkeletonTheme>
  );
}

SkeletonLoading.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  circle: PropTypes.bool,
};

SkeletonLoading.defaultProps = {
  circle: false,
};

export default SkeletonLoading;
