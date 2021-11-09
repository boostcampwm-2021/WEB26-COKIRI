import Image from 'next/image';
import { useRef } from 'react';

import LeftSlideButton from 'src/components/buttons/slides/LeftSlideButton';
import RightSlideButton from 'src/components/buttons/slides/RightSlideButton';

import { Wrapper, ImageHolder, SlideButtons } from './style';

function PostImage() {
  const leftSlideButtonRef = useRef<HTMLButtonElement>(null);
  const rightSlideButtonRef = useRef<HTMLButtonElement>(null);
  const imageHolderRef = useRef<HTMLUListElement>(null);

  let slideIndex = 0;
  const sliderWidth = 600;

  const leftButtonToggle = () => {
    if (slideIndex === 0) {
      leftSlideButtonRef.current!.classList.add('disappear');
    }
    if (slideIndex === 2) {
      rightSlideButtonRef.current!.classList.remove('disappear');
    }
  };
  const rightButtonToggle = () => {
    if (slideIndex === 1) {
      leftSlideButtonRef.current!.classList.remove('disappear');
    }
    if (slideIndex === 3) {
      rightSlideButtonRef.current!.classList.add('disappear');
    }
  };

  const slideLeft = () => {
    slideIndex -= 1;
    imageHolderRef.current!.style.marginLeft = `-${slideIndex * sliderWidth}px`;
    leftButtonToggle();
  };
  const slideRight = () => {
    slideIndex += 1;
    imageHolderRef.current!.style.marginLeft = `-${slideIndex * sliderWidth}px`;
    rightButtonToggle();
  };

  return (
    <Wrapper>
      <ImageHolder ref={imageHolderRef}>
        <li>
          <Image src='/images/logo.svg' width='600' height='300' />
        </li>
        <li>
          <Image src='/images/logo.svg' width='600' height='300' />
        </li>
        <li>
          <Image src='/images/logo.svg' width='600' height='300' />
        </li>
        <li>
          <Image src='/images/logo.svg' width='600' height='300' />
        </li>
      </ImageHolder>
      <SlideButtons>
        <LeftSlideButton onClick={slideLeft} buttonRef={leftSlideButtonRef} />
        <RightSlideButton onClick={slideRight} buttonRef={rightSlideButtonRef} />
      </SlideButtons>
    </Wrapper>
  );
}

export default PostImage;
