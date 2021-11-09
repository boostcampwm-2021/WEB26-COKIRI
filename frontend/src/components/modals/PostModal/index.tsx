import React, { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import { IoMdImages } from 'react-icons/io';
import PropTypes from 'prop-types';
import Image from 'next/image';

import Modal from 'src/components/modals/Common';
import IconButton from 'src/components/buttons/IconButton';
import { Row, Col } from 'src/components/Grid';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

import ImageUploadButton from 'src/components/buttons/ImageUploadButton';
import { Textarea, Wrapper } from './style';

interface Props {
  onClose: () => void;
}

function PostModal({ onClose }: Props) {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const user = useRecoilValue(userAtom);
  const mutation = useMutation(() => Fetcher.postPost(user, content), {
    onSuccess: () => onClose(),
  });

  const handleConfirm = () => {
    mutation.mutate();
  };

  const handleTextareaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }, []);

  const handleImageUpload = useCallback((image: string) => {
    setImages((prevState) => [...prevState, image]);
  }, []);

  const handleImageDelete = useCallback((index) => {
    setImages((prevState) => prevState.filter((image, i) => i !== index));
  }, []);

  return (
    <Wrapper>
      <Modal close='취소' confirm='확인' onConfirm={handleConfirm} onClose={onClose}>
        <ImageUploadButton onImageUpload={handleImageUpload} />
        <IconButton>
          <IoMdImages />
        </IconButton>
        <Textarea autoFocus value={content} onChange={handleTextareaChange} />
        <Row>
          {images.map((image, index) => (
            <Col>
              <button
                type='button'
                onClick={() => {
                  handleImageDelete(index);
                }}
              >
                삭제
              </button>
              <Image src={image} alt='' width={124} height={124} />
            </Col>
          ))}
        </Row>
      </Modal>
    </Wrapper>
  );
}

PostModal.propTypes = {
  onClose: PropTypes.func,
};

PostModal.defaultProps = {
  onClose: () => {},
};

export default PostModal;
