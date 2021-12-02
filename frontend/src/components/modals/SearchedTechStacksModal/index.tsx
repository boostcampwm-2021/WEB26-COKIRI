import { useState } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import ButtonCommon from 'src/components/buttons/Common';
import { Col } from 'src/components/Grid';

import Fetcher from 'src/utils/Fetcher';

interface Props {
  techStack: string;
  onClose: VoidFunction;
  onSelect: Function;
}

function SearchedTechStacksModal({ techStack, onClose, onSelect }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { data: searchedTechStacks } = useQuery(['dashboard', techStack], () =>
    Fetcher.getTechStacksSearch(techStack),
  );
  const handleClick = (index: number) => {
    if (index === selectedIndex) {
      setSelectedIndex(-1);
    } else {
      setSelectedIndex(index);
    }
  };
  const handleClose = () => {
    setSelectedIndex(-1);
    onClose();
  };
  const handleConfirm = () => {
    onSelect(searchedTechStacks![selectedIndex]);
    onClose();
  };

  return (
    <ModalCommon onClose={handleClose} onConfirm={handleConfirm} confirm='추가' close='취소'>
      <Col>
        {(searchedTechStacks ?? [])!.map((searchedTechStack, index) => (
          <ButtonCommon
            onClick={() => handleClick(index)}
            clicked={index === selectedIndex}
            title='tech-stack'
          >
            {searchedTechStack.techStack}
          </ButtonCommon>
        ))}
      </Col>
    </ModalCommon>
  );
}
SearchedTechStacksModal.propTypes = {
  techStack: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SearchedTechStacksModal;
