import PropTypes from 'prop-types';

import { Wrapper, Button } from './style';

interface Props {
  length: number;
  onClick: () => void;
}

function LikeListButton({ length, onClick }: Props) {
  return (
    <Wrapper>
      <Button onClick={onClick}>좋아요 {length}개</Button>
    </Wrapper>
  );
}

LikeListButton.propsType = {
  length: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default LikeListButton;
