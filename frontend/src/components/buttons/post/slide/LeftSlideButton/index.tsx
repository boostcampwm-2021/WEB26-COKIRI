// eslint-disable-next-line no-use-before-define
import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDropleftCircle } from 'react-icons/io';

import Common from 'src/components/buttons/post/slide/Common';

import { Wrapper } from './style';

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  buttonRef: React.RefObject<HTMLDivElement>;
}

function LefSlideButton({ onClick, buttonRef }: Props) {
  return (
    <Wrapper className='disappear' ref={buttonRef}>
      <Common onClick={onClick}>
        <IoIosArrowDropleftCircle />
      </Common>
    </Wrapper>
  );
}

LefSlideButton.propsType = {
  onClick: PropTypes.func.isRequired,
  buttonRef: PropTypes.object.isRequired,
};

export default LefSlideButton;
