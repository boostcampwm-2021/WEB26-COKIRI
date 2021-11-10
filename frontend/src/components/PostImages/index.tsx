import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import LeftSlideButton from 'src/components/buttons/slides/LeftSlideButton';
import RightSlideButton from 'src/components/buttons/slides/RightSlideButton';

import { Wrapper, ImageHolder, SlideButtons } from './style';

function PostImages() {
  const imageHolderRef = useRef<HTMLUListElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const sliderWidth = 600;

  const slideLeft = () => setSlideIndex(slideIndex - 1);
  const slideRight = () => setSlideIndex(slideIndex + 1);

  useEffect(() => {
    imageHolderRef.current!.style.marginLeft = `-${slideIndex * sliderWidth}px`;
  }, [slideIndex]);

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
        {slideIndex !== 0 && <LeftSlideButton onClick={slideLeft} />}
        {slideIndex !== 3 && <RightSlideButton onClick={slideRight} />}
      </SlideButtons>
    </Wrapper>
  );
}

export default PostImages;
