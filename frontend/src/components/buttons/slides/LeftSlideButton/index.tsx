import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDropleftCircle } from 'react-icons/io';

import IconButton from 'src/components/buttons/IconButton';

import { Wrapper } from './style';

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function LefSlideButton({ onClick }: Props) {
  return (
    <Wrapper>
      <IconButton onClick={onClick} padding={0} plain>
        <IoIosArrowDropleftCircle />
      </IconButton>
    </Wrapper>
  );
}

LefSlideButton.propsType = {
  onClick: PropTypes.func.isRequired,
};

export default LefSlideButton;
