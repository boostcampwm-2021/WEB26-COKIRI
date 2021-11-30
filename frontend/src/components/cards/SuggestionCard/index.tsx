import { useRecoilValue } from 'recoil';
import { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

import CardCommon from 'src/components/cards/Common';
import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import IconButton from 'src/components/buttons/IconButton';
import FollowSet from 'src/components/sets/FollowSet';
import UsernameButton from 'src/components/buttons/UsernameButton';
import { Row, Col } from 'src/components/Grid';

import {
  SUGGESTION_CARD_WIDTH,
  SUGGESTION_COUNT,
  SUGGESTION_PROFILE_IMAGE_SIZE,
} from 'src/globals/constants';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

import { Title } from './style';

function SuggestionCard() {
  const user = useRecoilValue(userAtom);
  const { data: users } = useQuery(['suggestion', 'users'], () => Fetcher.getUserSuggestions(user));

  const [startIndex, setStartIndex] = useState(0);
  const handleClickLeft = useCallback(() => {
    setStartIndex((prevState) => prevState - 1);
  }, []);
  const handleClickRight = useCallback(() => {
    setStartIndex((prevState) => prevState + 1);
  }, []);

  const isFirst = useMemo(() => startIndex === 0, [startIndex]);
  const isLast = useMemo(
    () => startIndex >= (users ?? []).length - SUGGESTION_COUNT,
    [startIndex, users],
  );

  return (
    <CardCommon width={SUGGESTION_CARD_WIDTH}>
      <Row justifyContent='space-between'>
        <IconButton hidden={isFirst} onClick={handleClickLeft} title='left'>
          <AiOutlineLeft />
        </IconButton>
        <Col alignItems='center'>
          <Title> 팔로우 하세요 </Title>
          <Row justifyContent='space-between'>
            {(users ?? [])!
              .slice(startIndex, startIndex + SUGGESTION_COUNT)
              .map((suggestedUser) => (
                <Col alignItems='center' key={suggestedUser._id}>
                  <UsernameButton username={suggestedUser.username!} />
                  <ProfileImageButton
                    size={SUGGESTION_PROFILE_IMAGE_SIZE}
                    username={suggestedUser.username!}
                    profileImage={suggestedUser.profileImage}
                  />
                  <FollowSet targetUserID={suggestedUser._id!} />
                </Col>
              ))}
          </Row>
        </Col>
        <IconButton hidden={isLast} onClick={handleClickRight} title='right'>
          <AiOutlineRight />
        </IconButton>
      </Row>
    </CardCommon>
  );
}

export default SuggestionCard;
