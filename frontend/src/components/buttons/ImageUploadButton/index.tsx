import React from 'react';

import PropTypes from 'prop-types';
import { Wrapper } from './style';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onImageUpload: (image: string) => void;
}

function ImageUploadButton({ onImageUpload }: Props) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files!);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        onImageUpload(reader.result as string);
      });
    });
  };

  return (
    <Wrapper>
      <input
        type='file'
        accept='image/jpg,image/png,image/jpeg,image/gif'
        onChange={handleOnChange}
        multiple
      />
    </Wrapper>
  );
}

ImageUploadButton.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default ImageUploadButton;
