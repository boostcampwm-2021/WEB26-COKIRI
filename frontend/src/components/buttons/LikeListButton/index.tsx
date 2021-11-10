import PropTypes from 'prop-types';

import { Wrapper, Button } from './style';

interface Props {
  length: string;
  changeModalState: () => void;
}

function LikeListButton({ length, changeModalState }: Props) {
  return (
    <Wrapper>
      <Button onClick={changeModalState}>좋아요 {length}개</Button>
    </Wrapper>
  );
}

LikeListButton.propsType = {
  length: PropTypes.string.isRequired,
  changeModalState: PropTypes.func.isRequired,
};
export default LikeListButton;
