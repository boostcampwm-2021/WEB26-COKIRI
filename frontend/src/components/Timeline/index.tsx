import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
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
import DeleteModal from 'src/components/modals/DeleteModal';
import Post from 'src/components/Post';
import { Row } from 'src/components/Grid';

import { PostType, ReturnType } from 'src/types';

import { useIntersectionObserver } from 'src/hooks';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

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
  const user = useRecoilValue(userAtom);
  const listRef = useRef<List | null>(null);
  const { ref } = useIntersectionObserver(() => onNeedMore());

  useEffect(() => () => cache.clearAll(), []);
  useEffect(() => {
    cache.clearAll();
    listRef.current?.recomputeRowHeights();
  }, [refetchCount]);

  const [isLikesModalShow, setIsLikesModalShow] = useState(false);
  const [isPostDeleteModalShow, setIsPostDeleteModalShow] = useState(false);
  const [modalPostID, setModalPostID] = useState<string>('');
  const posts: PostType[] = pages.reduce<PostType[]>(
    (acc, cur) => [...acc, ...(cur.data ?? [])],
    [],
  );
  const mutation = useMutation((postID: string) => Fetcher.deletePost(user, postID), {
    onSuccess: () => onPostDelete(),
  });
  const rowRenderer = ({ index, key, parent, style }: ListRowProps) => (
    <CellMeasurer cache={cache} parent={parent} key={key} rowIndex={index}>
      {({ measure, registerChild }) => (
        <Row style={style} ref={registerChild} justifyContent='center'>
          <Post
            key={key}
            post={posts[index]}
            onPostDelete={(postID: string) => {
              setIsPostDeleteModalShow(true);
              setModalPostID(postID);
            }}
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
      {isPostDeleteModalShow && (
        <DeleteModal
          onClose={() => setIsPostDeleteModalShow(false)}
          onConfirm={() => {
            mutation.mutate(modalPostID);
            setIsPostDeleteModalShow(false);
          }}
          title='포스트를 삭제하시겠습니까?'
        />
      )}
      <WindowScroller>
        {({ height, registerChild }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <div ref={registerChild}>
                <List
                  ref={listRef}
                  height={height}
                  width={width}
                  autoHeight
                  rowCount={posts.length}
                  rowHeight={cache.rowHeight}
                  rowRenderer={rowRenderer}
                  deferredMeasurementCache={cache}
                />
              </div>
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
