import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  ListRowProps,
  WindowScroller,
} from 'react-virtualized';

import LikesModal from 'src/components/modals/LikesModal';
import Post from 'src/components/Post';
import { Row } from 'src/components/Grid';

import { PostType, ReturnType } from 'src/types';

import { useIntersectionObserver } from 'src/hooks';

import { Observer, EndLabel } from './style';

interface Props {
  pages: ReturnType<PostType[]>[];
  onPostDelete: VoidFunction;
  onNeedMore: VoidFunction;
  hasNextPage: boolean;
  isFetchingNextPage?: boolean;
  refetchCount: number;
}

const cache = new CellMeasurerCache({
  fixedWidth: true,
});

function Timeline({
  pages,
  onPostDelete,
  onNeedMore,
  hasNextPage,
  isFetchingNextPage,
  refetchCount,
}: Props) {
  const listRef = useRef<List | null>(null);
  const { ref } = useIntersectionObserver(() => onNeedMore());

  useEffect(() => () => cache.clearAll(), []);
  useEffect(() => {
    cache.clearAll();
    listRef.current?.recomputeRowHeights();
  }, [refetchCount]);

  const [isLikesModalShow, setIsLikesModalShow] = useState(false);
  const [modalPostID, setModalPostID] = useState<string>('');
  const posts: PostType[] = pages.reduce<PostType[]>(
    (acc, cur) => [...acc, ...(cur.data ?? [])],
    [],
  );
  const rowRenderer = ({ index, key, parent, style }: ListRowProps) => (
    <CellMeasurer cache={cache} parent={parent} key={key} columnIndex={0} rowIndex={index}>
      {({ measure }) => (
        <Row style={style} justifyContent='center'>
          <Post
            key={key}
            post={posts[index]}
            onPostDelete={onPostDelete}
            onResize={() => {
              cache.clear(index, 0);
              listRef.current?.recomputeRowHeights(index);
            }}
            onLoad={measure}
            onLikes={(postID: string) => {
              setIsLikesModalShow(true);
              setModalPostID(postID);
            }}
          />
        </Row>
      )}
    </CellMeasurer>
  );
  return (
    <>
      {isLikesModalShow && (
        <LikesModal postID={modalPostID} onClose={() => setIsLikesModalShow(false)} />
      )}
      <WindowScroller>
        {({ height, scrollTop, isScrolling, onChildScroll }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                ref={listRef}
                autoHeight
                height={height}
                width={width}
                isScrolling={isScrolling}
                overscanRowCount={0}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                rowCount={posts.length}
                rowHeight={cache.rowHeight}
                rowRenderer={rowRenderer}
                deferredMeasurementCache={cache}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>

      {isFetchingNextPage && (
        <Row justifyContent='center'>
          <ReactLoading type='bubbles' color='#ffffff' />
        </Row>
      )}
      {!hasNextPage && (
        <Row justifyContent='center'>
          <EndLabel>끝</EndLabel>
        </Row>
      )}
      <Observer ref={ref} />
    </>
  );
}

Timeline.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.object),
  onPostDelete: PropTypes.func,
  onNeedMore: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool,
  isFetchingNextPage: PropTypes.bool.isRequired,
  refetchCount: PropTypes.number,
};

Timeline.defaultProps = {
  pages: [],
  hasNextPage: false,
  onPostDelete: () => {},
  refetchCount: 0,
};

export default Timeline;
