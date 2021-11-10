import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDroprightCircle } from 'react-icons/io';

import Common from 'src/components/buttons/slides/Common';

import { Wrapper } from './style';

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function RightSlideButton({ onClick }: Props) {
  return (
    <Wrapper>
      <Common onClick={onClick}>
        <IoIosArrowDroprightCircle />
      </Common>
    </Wrapper>
  );
}

RightSlideButton.propsType = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonRef: PropTypes.object.isRequired,
};

export default RightSlideButton;
