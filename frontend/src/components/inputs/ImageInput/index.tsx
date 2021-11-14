import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

import { Uploader } from 'src/utils';

import { Input } from './style';

interface Props {
  children: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onImageUpload: (image: string) => void;
}

function ImageInput({ onImageUpload, children }: Props) {
  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files!);
    const requests = files.map((file) => Uploader.uploadPostImage(file));
    const responses = await Promise.all(requests);
    responses.forEach((url) => onImageUpload(url));
  };

  return (
    <label htmlFor='image'>
      {children}
      <Input
        id='image'
        type='file'
        accept='image/jpg,image/png,image/jpeg,image/gif'
        onChange={handleOnChange}
        multiple
      />
    </label>
  );
}

ImageInput.propTypes = {
  children: PropTypes.node.isRequired,
  onImageUpload: PropTypes.func.isRequired,
};

export default ImageInput;
