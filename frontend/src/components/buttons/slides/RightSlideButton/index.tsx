// eslint-disable-next-line no-use-before-define
import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDroprightCircle } from 'react-icons/io';

import Common from 'src/components/buttons/slides/Common';

import { Wrapper } from './style';

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  buttonRef: React.RefObject<HTMLDivElement>;
}

function RightSlideButton({ onClick, buttonRef }: Props) {
  return (
    <Wrapper ref={buttonRef}>
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
