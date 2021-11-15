import React, { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { IoMdImages } from 'react-icons/io';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import ImageInput from 'src/components/inputs/ImageInput';
import PreviewImages from 'src/components/images/PreviewImages';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';
import postsAtom from 'src/recoil/posts';

import { PostType } from 'src/types';

import { Textarea, IconHolder } from './style';

interface Props {
  onClose: () => void;
}

function PostWriteModal({ onClose }: Props) {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const setPosts = useSetRecoilState(postsAtom);
  const user = useRecoilValue(userAtom);
  const mutation = useMutation(() => Fetcher.postPost(user, content, images), {
    onSuccess: ({ result: post }) => {
      setPosts((posts: PostType[]) => [post, ...posts]);
      onClose();
    },
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
    <ModalCommon close='취소' confirm='확인' onConfirm={handleConfirm} onClose={onClose}>
      <ImageInput onImageUpload={handleImageUpload}>
        <IconHolder>
          <IoMdImages />
        </IconHolder>
      </ImageInput>
      <Textarea autoFocus value={content} onChange={handleTextareaChange} />
      <PreviewImages images={images} onDelete={handleImageDelete} />
    </ModalCommon>
  );
}

PostWriteModal.propTypes = {
  onClose: PropTypes.func,
};

PostWriteModal.defaultProps = {
  onClose: () => {},
};

export default PostWriteModal;
