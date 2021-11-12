import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import LeftSlideButton from 'src/components/buttons/slides/LeftSlideButton';
import RightSlideButton from 'src/components/buttons/slides/RightSlideButton';

import { POST_IMAGE_WIDTH } from 'src/globals/constants';

import { Wrapper, ImageHolder, SlideButtons } from './style';

interface Props {
  images: string[];
}

function PostImages({ images }: Props) {
  const imageHolderRef = useRef<HTMLUListElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const isLeftButton = slideIndex !== 0;
  const isRightButton = images.length !== 1 && slideIndex !== images.length - 1;
  const slideLeft = () => setSlideIndex(slideIndex - 1);
  const slideRight = () => setSlideIndex(slideIndex + 1);

  useEffect(() => {
    imageHolderRef.current!.style.marginLeft = `-${slideIndex * POST_IMAGE_WIDTH}px`;
  }, [slideIndex]);

  return (
    <Wrapper>
      <ImageHolder ref={imageHolderRef} count={images.length}>
        {images.map((image) => (
          <li key={image}>
            <Image src={image} width={POST_IMAGE_WIDTH} height='300' />
          </li>
        ))}
      </ImageHolder>
      <SlideButtons>
        {isLeftButton && <LeftSlideButton onClick={slideLeft} />}
        {isRightButton && <RightSlideButton onClick={slideRight} />}
      </SlideButtons>
    </Wrapper>
  );
}

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PostImages;
