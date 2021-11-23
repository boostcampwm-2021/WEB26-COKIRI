import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

import ButtonCommon from 'src/components/buttons/Common';
import ModalCommon from 'src/components/modals/Common';
import { Col } from 'src/components/Grid';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import { REPOS_MODAL_HEIGHT } from 'src/globals/constants';

import { RepoType } from 'src/types';

import { Wrapper, Repos } from './style';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onSelect: (repo: RepoType) => void;
  onClose: () => void;
}

function ReposModal({ onClose, onSelect }: Props) {
  const user = useRecoilValue(userAtom);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { data: repos, isLoading } = useQuery(['repositories', user._id], () =>
    Fetcher.getUserRepos(user),
  );
  const handleConfirm = () => {
    onSelect(repos![selectedIndex]);
  };

  const handleRepoClick = (index: number) => {
    if (index === selectedIndex) {
      setSelectedIndex(-1);
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <Wrapper>
      <ModalCommon
        onConfirm={handleConfirm}
        close='취소'
        confirm='선택'
        height={REPOS_MODAL_HEIGHT}
        onClose={onClose}
        disabled={selectedIndex === -1}
      >
        <Repos>
          {!isLoading &&
            repos!.map((repo, index) => (
              <Col key={repo.name}>
                <ButtonCommon
                  onClick={() => handleRepoClick(index)}
                  clicked={index === selectedIndex}
                >
                  {repo.name}
                </ButtonCommon>
              </Col>
            ))}
        </Repos>
      </ModalCommon>
    </Wrapper>
  );
}

ReposModal.propTypes = {
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
};

ReposModal.defaultProps = {
  onClose: () => {},
  onSelect: () => {},
};

export default ReposModal;
