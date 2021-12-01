import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PropTypes from 'prop-types';

interface Props {
  width: string;
  height: string;
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
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  circle: PropTypes.bool,
};

SkeletonLoading.defaultProps = {
  circle: false,
};

export default SkeletonLoading;
