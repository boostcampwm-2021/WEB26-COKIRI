import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

import Post from 'src/components/Post';

import { PostType, ReturnType } from 'src/types';

import { useIntersectionObserver } from 'src/hooks';

interface Props {
  pages?: ReturnType<PostType[]>[];
  onPostDelete?: () => void;
  onNeedMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

function Timeline({ pages, onPostDelete, onNeedMore, hasNextPage, isFetchingNextPage }: Props) {
  const { ref } = useIntersectionObserver(() => {
    onNeedMore!();
  });

  return (
    <>
      {pages!.map(({ data }) =>
        data!.map((post) => <Post key={post._id} post={post} onPostDelete={onPostDelete!} />),
      )}

      <div ref={ref} />
      {isFetchingNextPage && <ReactLoading type='bubbles' color='#ffffff' />}
      {!hasNextPage && <p>끝</p>}
    </>
  );
}

Timeline.protoTypes = {
  pages: PropTypes.arrayOf(PropTypes.object),
  onPostDelete: PropTypes.func,
  onNeedMore: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  isFetchingNextPage: PropTypes.bool.isRequired,
};

Timeline.defaultProps = {
  pages: [],
  onPostDelete: () => {},
  onNeedMore: () => {},
  hasNextPage: false,
  isFetchingNextPage: false,
};

export default Timeline;
