import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDroprightCircle } from 'react-icons/io';

import IconButton from 'src/components/buttons/IconButton';

import { Wrapper } from './style';

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function RightSlideButton({ onClick }: Props) {
  return (
    <Wrapper>
      <IconButton onClick={onClick} padding={0} plain title='right-slide'>
        <IoIosArrowDroprightCircle />
      </IconButton>
    </Wrapper>
  );
}

RightSlideButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RightSlideButton;
