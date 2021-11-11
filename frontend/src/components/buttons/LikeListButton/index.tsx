import PropTypes from 'prop-types';

import { Wrapper, Button } from './style';

interface Props {
  count: number;
  onClick: () => void;
}

function LikeListButton({ count, onClick }: Props) {
  return (
    <Wrapper>
      <Button onClick={onClick}>좋아요 {count}개</Button>
    </Wrapper>
  );
}

LikeListButton.propsType = {
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default LikeListButton;
