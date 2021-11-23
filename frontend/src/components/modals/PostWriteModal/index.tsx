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
import RepoContent from 'src/components/contents/RepoContent';
import ProblemContent from 'src/components/contents/ProblemContent';
import { Row } from 'src/components/Grid';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

import { ExternalType, ProblemInfoType, ProblemType, RepoInfoType, RepoType } from 'src/types';

import { Textarea, IconHolder, Preview, Cover, LinkButton } from './style';

interface Props {
  onPostWrite: () => void;
  onClose: () => void;
}

function PostWriteModal({ onClose, onPostWrite }: Props) {
  const user = useRecoilValue(userAtom);

  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [external, setExternal] = useState<ExternalType>();
  const [externalType, setExternalType] = useState<'repo' | 'problem' | 'blog' | ''>('');

  const [isReposModalShow, setIsReposModalShow] = useState(false);
  const [isProblemsModalShow, setIsProblemsModalShow] = useState(false);
  const mutation = useMutation(() => Fetcher.postPost(user, content, images, external), {
    onSuccess: () => onPostWrite(),
  });
  const problemMutation = useMutation((id: string) => Fetcher.getProblem(id), {
    onSuccess: (problem: ExternalType) => {
      setExternal(problem);
      setExternalType('problem');
    },
  });
  const repoMutation = useMutation((name: string) => Fetcher.getUserRepo(user, name), {
    onSuccess: (repo: ExternalType) => {
      setExternal(repo);
      setExternalType('repo');
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
    repoMutation.mutate(repo.name);
    setIsReposModalShow(false);
  };
  const handleProblemSelect = (problem: ProblemType) => {
    problemMutation.mutate(problem.id);
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
      <ModalCommon
        close='취소'
        confirm='확인'
        onConfirm={handleConfirm}
        onClose={onClose}
        disabled={content === ''}
      >
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
        {externalType !== '' && (
          <Preview>
            <Cover />
            {externalType === 'repo' && (
              <RepoContent
                content={external!.content!}
                info={external!.info as RepoInfoType}
                link={external!.link}
              />
            )}
            {externalType === 'problem' && (
              <ProblemContent
                content={external!.content!}
                info={external!.info as ProblemInfoType}
                link={external!.link}
              />
            )}
            {/* {externalType === 'blog' && <RepoPreview />} */}
            <LinkButton href={external!.link} target='_blank' rel='noreferrer noopener'>
              바로가기
            </LinkButton>
          </Preview>
        )}
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
