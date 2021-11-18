import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { Row, Col } from 'src/components/Grid';

import {
  POST_WRITE_PREVIEW_IMAGE_WIDTH,
  POST_WRITE_PREVIEW_IMAGE_HEIGHT,
} from 'src/globals/constants';

import { Wrapper } from './style';

interface Props {
  images: string[];
  // eslint-disable-next-line no-unused-vars
  onDelete: (index: number) => void;
}

function ImagesPreview({ images, onDelete }: Props) {
  return (
    <Wrapper>
      <Row>
        {images.map((image, index) => (
          <Col key={image}>
            <button
              type='button'
              onClick={() => {
                onDelete(index);
              }}
            >
              삭제
            </button>
            <Image
              width={POST_WRITE_PREVIEW_IMAGE_WIDTH}
              height={POST_WRITE_PREVIEW_IMAGE_HEIGHT}
              src={image}
            />
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
}

ImagesPreview.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDelete: PropTypes.func,
};

ImagesPreview.defaultProps = {
  onDelete: () => {},
};

export default ImagesPreview;
