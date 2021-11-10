import PropTypes from 'prop-types';

import { Wrapper, Button } from './style';

interface Props {
  length: string;
  handleClick: () => void;
}

function LikeListButton({ length, handleClick }: Props) {
  return (
    <Wrapper>
      <Button onClick={handleClick}>좋아요 {length}개</Button>
    </Wrapper>
  );
}

LikeListButton.propsType = {
  length: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default LikeListButton;
