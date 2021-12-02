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
import BlogsModal from 'src/components/modals/BlogsModal';
import ExternalPreview from 'src/components/ExternalPreview';
import { Row } from 'src/components/Grid';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

import { BlogType, ExternalType, ProblemType, RepoType } from 'src/types';

import { Textarea, ImageInputHolder } from './style';

interface Props {
  onPostWrite: VoidFunction;
  onClose: VoidFunction;
}

function PostWriteModal({ onClose, onPostWrite }: Props) {
  const user = useRecoilValue(userAtom);

  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [external, setExternal] = useState<ExternalType>();

  const [isReposModalShow, setIsReposModalShow] = useState(false);
  const [isProblemsModalShow, setIsProblemsModalShow] = useState(false);
  const [isBlogsModalShow, setIsBlogsModalShow] = useState(false);

  const mutation = useMutation(() => Fetcher.postPost(user, content.trim(), images, external), {
    onSuccess: () => onPostWrite(),
  });
  const problemMutation = useMutation((id: string) => Fetcher.getProblem(id), {
    onSuccess: (problem: ExternalType) => setExternal(problem),
  });
  const repoMutation = useMutation((name: string) => Fetcher.getUserRepo(user, name), {
    onSuccess: (repo: ExternalType) => setExternal(repo),
  });
  const blogMutation = useMutation(
    (blog: BlogType) => Fetcher.getUserBlog(user, blog.identity, blog.postID),
    {
      onSuccess: (blog: ExternalType) => setExternal(blog),
    },
  );

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

  const handleExternalDelete = useCallback(() => {
    setExternal(undefined);
  }, []);

  const handleClickGithub = () => setIsReposModalShow(true);
  const handleClickProblems = () => setIsProblemsModalShow(true);
  const handleClickBlogs = () => setIsBlogsModalShow(true);

  const handleReposModalClose = () => setIsReposModalShow(false);
  const handleProblemsModalClose = () => setIsProblemsModalShow(false);
  const handleBlogsModalClose = () => setIsBlogsModalShow(false);

  const handleRepoSelect = (repo: RepoType) => {
    repoMutation.mutate(repo.name);
    setIsReposModalShow(false);
  };
  const handleProblemSelect = (problem: ProblemType) => {
    problemMutation.mutate(problem.id);
    setIsProblemsModalShow(false);
  };
  const handleBlogSelect = (blog: BlogType) => {
    blogMutation.mutate(blog);
    setIsBlogsModalShow(false);
  };

  return (
    <>
      {isReposModalShow && (
        <ReposModal onClose={handleReposModalClose} onSelect={handleRepoSelect} />
      )}
      {isProblemsModalShow && (
        <ProblemsModal onClose={handleProblemsModalClose} onSelect={handleProblemSelect} />
      )}
      {isBlogsModalShow && (
        <BlogsModal onClose={handleBlogsModalClose} onSelect={handleBlogSelect} />
      )}
      <ModalCommon
        close='취소'
        confirm='확인'
        onConfirm={handleConfirm}
        onClose={onClose}
        disabled={content.trim() === ''}
      >
        <Row justifyContent='center' alignItems='center'>
          <ImageInputHolder>
            <ImageInput onImageUpload={handleImageUpload}>
              <IoMdImages />
              <p>{images.length} / 3</p>
            </ImageInput>
          </ImageInputHolder>
          <ButtonCommon onClick={handleClickGithub} title='github'>
            깃허브
          </ButtonCommon>
          <ButtonCommon onClick={handleClickProblems} title='problem'>
            백준
          </ButtonCommon>
          <ButtonCommon onClick={handleClickBlogs} title='blog'>
            블로그
          </ButtonCommon>
        </Row>
        <Textarea autoFocus value={content} onChange={handleTextareaChange} />
        <PreviewImages images={images} onDelete={handleImageDelete} />
        <ExternalPreview external={external} onDelete={handleExternalDelete} />
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
