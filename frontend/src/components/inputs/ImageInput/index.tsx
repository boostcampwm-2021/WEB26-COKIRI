import React, { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';

import { Uploader } from 'src/utils';

import { Input } from './style';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onImageUpload: (image: string) => void;
}

function ImageInput({ onImageUpload, children }: PropsWithChildren<Props>) {
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files!);
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
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
        onChange={handleChange}
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
