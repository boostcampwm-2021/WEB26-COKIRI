import PropTypes from 'prop-types';

import { Wrapper, Button } from './style';

interface Props {
  likeCount: number;
  onClick: () => void;
}

function LikeListButton({ likeCount, onClick }: Props) {
  return (
    <Wrapper>
      <Button onClick={onClick}>좋아요 {likeCount}개</Button>
    </Wrapper>
  );
}

LikeListButton.propsType = {
  likeCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default LikeListButton;
