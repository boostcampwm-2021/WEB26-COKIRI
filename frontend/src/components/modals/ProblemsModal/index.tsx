import { useState } from 'react';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import InputCommon from 'src/components/inputs/Common';
import ButtonCommon from 'src/components/buttons/Common';
import { Col, Row } from 'src/components/Grid';

import { Fetcher } from 'src/utils';

import { PROBLEM_BUTTON_WIDTH, PROBLEMS_MODAL_HEIGHT } from 'src/globals/constants';

import { Wrapper, Problem, Title } from './style';

interface Props {
  onClose: () => void;
}

function ProblemsModal({ onClose }: Props) {
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [query, setQuery] = useState('');
  const { mutate, data } = useMutation(() => Fetcher.getProblemSearch(query));
  const handleSearchClick = () => {
    mutate();
  };
  const handleProblemClick = (index: number) => {
    setClickedIndex(index);
  };

  const handleConfirm = () => {
    onClose();
  };

  return (
    <Wrapper>
      <ModalCommon
        onClose={onClose}
        confirm='선택'
        height={PROBLEMS_MODAL_HEIGHT}
        onConfirm={handleConfirm}
      >
        <Row>
          <InputCommon bind={[query, setQuery]} />
          <ButtonCommon onClick={handleSearchClick}> 검색</ButtonCommon>
        </Row>
        <Col>
          {(data ?? []).map(({ id, title }, index) => (
            <Problem key={id}>
              <Row justifyContent='space-between' alignItems='center'>
                <ButtonCommon
                  width={PROBLEM_BUTTON_WIDTH}
                  onClick={() => {
                    handleProblemClick(index);
                  }}
                  clicked={index === clickedIndex}
                >
                  <Title>{id}</Title>:<Title>{title}</Title>
                </ButtonCommon>
              </Row>
            </Problem>
          ))}
        </Col>
      </ModalCommon>
    </Wrapper>
  );
}

ProblemsModal.propTyes = {
  onClose: PropTypes.func.isRequired,
};

export default ProblemsModal;
