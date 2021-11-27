import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import LeftSlideButton from 'src/components/buttons/slides/LeftSlideButton';
import RightSlideButton from 'src/components/buttons/slides/RightSlideButton';

import { DEFAULT_POST_IMAGE_WIDTH, DEFAULT_POST_IMAGE_HEIGHT } from 'src/globals/constants';

import { ImageType } from 'src/types';

import { Wrapper, ImageHolder, SlideButtons } from './style';

interface Props {
  images: ImageType[];
  width?: number;
  height?: number;
  expanded?: boolean;
}

function PostImages({ images, width, height, expanded }: Props) {
  const imageHolderRef = useRef<HTMLUListElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const isLeftButton = slideIndex !== 0;
  const isRightButton = images.length > 1 && slideIndex !== images.length - 1;
  const slideLeft = () => setSlideIndex(slideIndex - 1);
  const slideRight = () => setSlideIndex(slideIndex + 1);
  useEffect(() => {
    imageHolderRef.current!.style.marginLeft = expanded
      ? `-${slideIndex * 100}vh`
      : `-${slideIndex * width!}px`;
  }, [slideIndex, expanded, width]);

  return (
    <Wrapper width={width!} expanded={expanded}>
      <ImageHolder ref={imageHolderRef} count={images.length} width={width!} expanded={expanded}>
        {images.map((image) => (
          <li key={image._id}>
            <Image src={image.url} width={width} height={height} alt='' />
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
  images: PropTypes.arrayOf(PropTypes.any).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  expanded: PropTypes.bool,
};

PostImages.defaultProps = {
  width: DEFAULT_POST_IMAGE_WIDTH,
  height: DEFAULT_POST_IMAGE_HEIGHT,
  expanded: false,
};

export default PostImages;
