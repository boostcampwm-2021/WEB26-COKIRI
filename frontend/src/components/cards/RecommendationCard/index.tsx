import { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

import CardCommon from 'src/components/cards/Common';
import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import IconButton from 'src/components/buttons/IconButton';
import { Row, Col } from 'src/components/Grid';

import {
  RECOMMENDATION_CARD_WIDTH,
  SUGGESTION_COUNT,
  SUGGESTION_PROFILE_IMAGE_SIZE,
} from 'src/globals/constants';

import { UserType } from 'src/types';

import { Fetcher } from 'src/utils';

import { Title } from './style';

interface Props {
  user: UserType;
}

function RecommendationCard({ user }: Props) {
  const { data: users } = useQuery(['suggestion', 'posts', user._id], () =>
    Fetcher.getUserSuggestions(user),
  );
  const [startIndex, setStartIndex] = useState(0);

  const handleClickLeft = useCallback(() => {
    setStartIndex((prevState) => prevState - 1);
  }, []);
  const handleClickRight = useCallback(() => {
    setStartIndex((prevState) => prevState + 1);
  }, []);

  const isFirst = useMemo(() => startIndex === 0, [startIndex]);
  const isLast = useMemo(
    () => startIndex === (users ?? []).length - SUGGESTION_COUNT,
    [startIndex, users],
  );

  return (
    <CardCommon width={RECOMMENDATION_CARD_WIDTH}>
      <Row>
        <IconButton hidden={isFirst} onClick={handleClickLeft}>
          <AiOutlineLeft />
        </IconButton>
        <Col alignItems='center'>
          <Title> 팔로우 하세요 </Title>
          <Row justifyContent='space-between'>
            {(users ?? [])!
              .slice(startIndex, startIndex + SUGGESTION_COUNT)
              .map((suggestedUser) => (
                <Col alignItems='center' key={suggestedUser._id}>
                  <p>{suggestedUser.username}</p>
                  <ProfileImageButton
                    size={SUGGESTION_PROFILE_IMAGE_SIZE}
                    username={suggestedUser.username!}
                    profileImage={suggestedUser.profileImage}
                  />
                </Col>
              ))}
          </Row>
        </Col>
        <IconButton hidden={isLast} onClick={handleClickRight}>
          <AiOutlineRight />
        </IconButton>
      </Row>
    </CardCommon>
  );
}

RecommendationCard.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecommendationCard;
