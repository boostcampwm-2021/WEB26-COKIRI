import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useInfiniteQuery, useMutation } from 'react-query';

import SigninCard from 'src/components/cards/SigninCard';
import SuggestionCard from 'src/components/cards/SuggestionCard';
import FloatingButton from 'src/components/buttons/FloatingButton';
import Post from 'src/components/Post';
import Timeline from 'src/components/Timeline';
import LikesModal from 'src/components/modals/LikesModal';
import DeleteModal from 'src/components/modals/DeleteModal';
import { Row } from 'src/components/Grid';

import userAtom, {
  hasFollowSelector,
  isAuthenticatedSelector,
  isRegisteredSelector,
} from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import { PostType } from 'src/types';

import { Page } from 'src/styles';

interface Props {
  firstPost?: PostType;
}

function HomeMain({ firstPost }: Props) {
  const user = useRecoilValue(userAtom);
  const hasFollow = useRecoilValue(hasFollowSelector);
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const isRegistered = useRecoilValue(isRegisteredSelector);
  const [hasFollowTemp] = useState(hasFollow);
  const [isLikesModalShow, setIsLikesModalShow] = useState(false);
  const [isPostDeleteModalShow, setIsPostDeleteModalShow] = useState(false);
  const [modalPostID, setModalPostID] = useState<string>('');
  const [refetchCount, setRefetchCount] = useState(0);
  const [firstPostTemp, setFirstPostTemp] = useState(firstPost);

  const { refetch, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['home', 'posts', user],
    (context) => Fetcher.getPosts(user, context),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const mutation = useMutation(() => Fetcher.getFirstPost(user, user.token!), {
    onSuccess: (result) => setFirstPostTemp(result),
  });
  const refetchWithCount = async () => {
    mutation.mutate();
    await refetch();
    setRefetchCount(refetchCount + 1);
  };
  const deleteMutation = useMutation((postID: string) => Fetcher.deletePost(user, postID), {
    onSuccess: () => refetchWithCount(),
  });

  return (
    <Page.Main>
      {!isAuthenticated && (
        <Row justifyContent='center'>
          <SigninCard />
        </Row>
      )}
      {isRegistered && !hasFollowTemp && (
        <Row justifyContent='center'>
          <SuggestionCard />
        </Row>
      )}
      {isRegistered && (
        <>
          {isLikesModalShow && (
            <LikesModal postID={modalPostID} onClose={() => setIsLikesModalShow(false)} />
          )}
          {isPostDeleteModalShow && (
            <DeleteModal
              onClose={() => setIsPostDeleteModalShow(false)}
              onConfirm={() => {
                deleteMutation.mutate(modalPostID);
                setIsPostDeleteModalShow(false);
              }}
              title='포스트를 삭제하시겠습니까?'
            />
          )}
          {firstPostTemp && (
            <Row justifyContent='center'>
              <Post
                onPostDelete={(postID: string) => {
                  setIsPostDeleteModalShow(true);
                  setModalPostID(postID);
                }}
                post={firstPostTemp}
                onLikes={(postID: string) => {
                  setIsLikesModalShow(true);
                  setModalPostID(postID);
                }}
              />
            </Row>
          )}
          <Timeline
            pages={data?.pages}
            onPostDelete={refetchWithCount}
            onNeedMore={fetchNextPage}
            hasNextPage={hasNextPage}
            refetchCount={refetchCount}
            isFetchingNextPage={isFetchingNextPage}
          />
        </>
      )}
      {isRegistered && <FloatingButton onPostWrite={refetchWithCount} />}
    </Page.Main>
  );
}

HomeMain.defaultProps = {
  firstPost: undefined,
};

export default HomeMain;
