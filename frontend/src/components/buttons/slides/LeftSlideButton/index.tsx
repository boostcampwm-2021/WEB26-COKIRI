import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDropleftCircle } from 'react-icons/io';

import Common from 'src/components/buttons/slides/Common';

import { Wrapper } from './style';

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function LefSlideButton({ onClick }: Props) {
  return (
    <Wrapper>
      <Common onClick={onClick}>
        <IoIosArrowDropleftCircle />
      </Common>
    </Wrapper>
  );
}

LefSlideButton.propsType = {
  onClick: PropTypes.func.isRequired,
};

export default LefSlideButton;
