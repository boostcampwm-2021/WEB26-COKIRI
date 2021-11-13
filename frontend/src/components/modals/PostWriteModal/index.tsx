import React, { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';

import Modal from 'src/components/modals/Common';
import ImageInput from 'src/components/inputs/ImageInput';
import ImagesPreview from 'src/components/ImagesPreview';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

import { Textarea } from './style';

interface Props {
  onClose: () => void;
}

function PostWriteModal({ onClose }: Props) {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const user = useRecoilValue(userAtom);
  const mutation = useMutation(() => Fetcher.postPost(user, content, images), {
    onSuccess: () => onClose(),
  });

  const handleConfirm = () => {
    mutation.mutate();
  };

  const handleTextareaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }, []);

  const handleImageUpload = useCallback((image: string) => {
    setImages((prevState) => {
      if (prevState.length < 3) {
        return [...prevState, image];
      }
      return prevState;
    });
  }, []);

  const handleImageDelete = useCallback((index) => {
    setImages((prevState) => prevState.filter((image, i) => i !== index));
  }, []);

  return (
    <Modal close='취소' confirm='확인' onConfirm={handleConfirm} onClose={onClose}>
      <ImageInput onImageUpload={handleImageUpload} />
      <Textarea autoFocus value={content} onChange={handleTextareaChange} />
      <ImagesPreview images={images} onDelete={handleImageDelete} />
    </Modal>
  );
}

PostWriteModal.propTypes = {
  onClose: PropTypes.func,
};

PostWriteModal.defaultProps = {
  onClose: () => {},
};

export default PostWriteModal;
