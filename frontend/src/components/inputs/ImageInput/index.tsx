import React from 'react';
import PropTypes from 'prop-types';
import { IoMdImages } from 'react-icons/io';

import { Uploader } from 'src/utils';
import { Wrapper } from './style';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onImageUpload: (image: string) => void;
}

function ImageInput({ onImageUpload }: Props) {
  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files!);
    const requests = files.map((file) => Uploader.uploadPostImage(file));
    const responses = await Promise.all(requests);
    responses.forEach((url) => onImageUpload(url));
  };

  return (
    <Wrapper>
      <label htmlFor='image'>
        <IoMdImages />
        <input
          id='image'
          type='file'
          accept='image/jpg,image/png,image/jpeg,image/gif'
          onChange={handleOnChange}
          multiple
        />
      </label>
    </Wrapper>
  );
}

ImageInput.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default ImageInput;
