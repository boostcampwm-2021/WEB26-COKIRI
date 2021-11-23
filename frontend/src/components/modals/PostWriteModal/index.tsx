import React, { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import { IoMdImages } from 'react-icons/io';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import ImageInput from 'src/components/inputs/ImageInput';
import PreviewImages from 'src/components/images/PreviewImages';
import ButtonCommon from 'src/components/buttons/Common';
import ReposModal from 'src/components/modals/ReposModal';
import ProblemsModal from 'src/components/modals/ProblemsModal';
import { Row } from 'src/components/Grid';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

import { ProblemType, RepoType } from 'src/types';

import { Textarea, IconHolder } from './style';

interface Props {
  onPostWrite: () => void;
  onClose: () => void;
}

function PostWriteModal({ onClose, onPostWrite }: Props) {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const [isReposModalShow, setIsReposModalShow] = useState(false);
  const [isProblemsModalShow, setIsProblemsModalShow] = useState(false);
  const user = useRecoilValue(userAtom);
  const mutation = useMutation(() => Fetcher.postPost(user, content, images), {
    onSuccess: () => {
      onClose();
      onPostWrite();
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

  const handleClickGithub = () => setIsReposModalShow(true);
  const handleClickProblems = () => setIsProblemsModalShow(true);
  const handleReposModalClose = () => setIsReposModalShow(false);
  const handleProblemsModalClose = () => setIsProblemsModalShow(false);
  const handleRepoSelect = (repo: RepoType) => {
    console.log(repo);
    setIsReposModalShow(false);
  };
  const handleProblemSelect = (problem: ProblemType) => {
    console.log(problem);
    setIsProblemsModalShow(false);
  };

  return (
    <>
      {isReposModalShow && (
        <ReposModal onClose={handleReposModalClose} onSelect={handleRepoSelect} />
      )}
      {isProblemsModalShow && (
        <ProblemsModal onClose={handleProblemsModalClose} onSelect={handleProblemSelect} />
      )}
      <ModalCommon close='취소' confirm='확인' onConfirm={handleConfirm} onClose={onClose}>
        <Row justifyContent='center' alignItems='center' margin={16}>
          <ImageInput onImageUpload={handleImageUpload}>
            <IconHolder>
              <IoMdImages />
            </IconHolder>
          </ImageInput>
          <ButtonCommon onClick={handleClickGithub}>깃허브</ButtonCommon>
          <ButtonCommon onClick={handleClickProblems}>백준</ButtonCommon>
        </Row>
        <Textarea autoFocus value={content} onChange={handleTextareaChange} />
        <PreviewImages images={images} onDelete={handleImageDelete} />
      </ModalCommon>
    </>
  );
}

PostWriteModal.propTypes = {
  onClose: PropTypes.func,
  onPostWrite: PropTypes.func,
};

PostWriteModal.defaultProps = {
  onClose: () => {},
  onPostWrite: () => {},
};

export default PostWriteModal;
