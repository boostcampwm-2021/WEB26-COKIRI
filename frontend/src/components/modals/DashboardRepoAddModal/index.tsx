import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import ButtonCommon from 'src/components/buttons/Common';
import ExternalPreview from 'src/components/ExternalPreview';
import NavigateIconButton from 'src/components/buttons/NavigateIconButton';
import { Col } from 'src/components/Grid';

import userAtom from 'src/recoil/user';

import { ExternalType } from 'src/types';

import { Fetcher } from 'src/utils';

import { Repos } from './style';

interface Props {
  onClose: VoidFunction;
  onAddRepo: Function;
}

function DashboardRepoAddModal({ onClose, onAddRepo }: Props) {
  const user = useRecoilValue(userAtom);
  const { hasExternalGithub } = user;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [external, setExternal] = useState<ExternalType>();
  const { data: repos } = useQuery(['dashboard', 'repoList', user._id], () =>
    Fetcher.getUserRepos(user),
  );

  const getRepoMutation = useMutation((name: string) => Fetcher.getUserRepo(user, name), {
    onSuccess: (repo: ExternalType) => {
      setExternal(repo);
    },
  });

  const postRepoMutation = useMutation(
    (repoName: string) => Fetcher.postDashboardRepo(user, repoName),
    {
      onSuccess: (data) => onAddRepo(data),
    },
  );

  const handleConfirm = () => {
    postRepoMutation.mutate(repos![selectedIndex].name);
    onClose();
  };

  const handleRepoClick = (index: number) => {
    if (index === selectedIndex) {
      setSelectedIndex(-1);
    } else {
      getRepoMutation.mutate(repos![index].name);
      setSelectedIndex(index);
    }
  };

  const handleExternalDelete = () => {
    setExternal(undefined);
    setSelectedIndex(-1);
  };

  return (
    <ModalCommon
      onConfirm={handleConfirm}
      onClose={onClose}
      confirm='저장'
      close='취소'
      title={hasExternalGithub ? '저장소를 선택하세요' : '연동된 깃헙이 없습니다'}
      disabled={selectedIndex === -1}
    >
      {hasExternalGithub ? (
        <Repos>
          {(repos ?? []).map((repo, index) => (
            <Col key={repo.name}>
              <ButtonCommon
                title='repo'
                onClick={() => handleRepoClick(index)}
                clicked={index === selectedIndex}
              >
                {repo.name}
              </ButtonCommon>
            </Col>
          ))}
        </Repos>
      ) : (
        <NavigateIconButton href={`/users/${user.username}/settings`} title='external-auth'>
          연동하러 가기
        </NavigateIconButton>
      )}
      <ExternalPreview external={external} onDelete={handleExternalDelete} />
    </ModalCommon>
  );
}

DashboardRepoAddModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddRepo: PropTypes.func.isRequired,
};

export default DashboardRepoAddModal;
