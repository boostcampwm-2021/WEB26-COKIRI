import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from 'react-query';

import SigninCard from 'src/components/cards/SigninCard';
import SuggestionCard from 'src/components/cards/SuggestionCard';
import FloatingButton from 'src/components/buttons/FloatingButton';
import Post from 'src/components/Post';
import Timeline from 'src/components/Timeline';
import { Col } from 'src/components/Grid';

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

  const { refetch, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['home', 'posts', user],
    (context) => Fetcher.getPosts(user, context),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  return (
    <Page.Main>
      <Col alignItems='center'>
        {!isAuthenticated && <SigninCard />}
        {isRegistered && !hasFollowTemp && <SuggestionCard />}
        {isRegistered && (
          <>
            {firstPost && <Post onPostDelete={refetch} post={firstPost} />}
            <Timeline
              pages={data?.pages}
              onPostDelete={refetch}
              onNeedMore={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </>
        )}
      </Col>
      {isRegistered && <FloatingButton onPostWrite={refetch} />}
    </Page.Main>
  );
}

HomeMain.defaultProps = {
  firstPost: undefined,
};

export default HomeMain;
