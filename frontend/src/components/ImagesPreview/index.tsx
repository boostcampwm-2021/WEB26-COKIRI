import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { Row, Col } from 'src/components/Grid';

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
            <Image width={100} height={100} src={image} />
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
