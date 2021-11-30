import { useState } from 'react';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import InputCommon from 'src/components/inputs/Common';
import ButtonCommon from 'src/components/buttons/Common';
import { Col, Row } from 'src/components/Grid';

import { Fetcher } from 'src/utils';

import { ProblemType } from 'src/types';

import { Wrapper, Problems } from './style';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onSelect: (problem: ProblemType) => void;
  onClose: VoidFunction;
}

function ProblemsModal({ onClose, onSelect }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [query, setQuery] = useState('');
  const { mutate, data: problems } = useMutation(() => Fetcher.getProblems(query));
  const handleSearchClick = () => {
    mutate();
  };

  const handleConfirm = () => {
    onSelect(problems![selectedIndex]);
  };

  const handleProblemClick = (index: number) => {
    if (index === selectedIndex) {
      setSelectedIndex(-1);
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <Wrapper>
      <ModalCommon
        onClose={onClose}
        close='취소'
        confirm='선택'
        onConfirm={handleConfirm}
        disabled={selectedIndex === -1}
        title='문제를 검색하고 선택하세요'
      >
        <Row>
          <InputCommon bind={[query, setQuery]} title='problem-search' />
          <ButtonCommon onClick={handleSearchClick} title='search'>
            검색
          </ButtonCommon>
        </Row>
        <Problems>
          {(problems ?? []).map(({ id, title }, index) => (
            <Col key={id}>
              <ButtonCommon
                onClick={() => handleProblemClick(index)}
                clicked={index === selectedIndex}
                title='problem'
              >
                {id}:{title}
              </ButtonCommon>
            </Col>
          ))}
        </Problems>
      </ModalCommon>
    </Wrapper>
  );
}

ProblemsModal.propTyes = {
  onClose: PropTypes.func.isRequired,
};

export default ProblemsModal;
