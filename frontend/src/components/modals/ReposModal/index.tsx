import React from 'react';
// import { useRecoilValue } from 'recoil';
// import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import { Col } from 'src/components/Grid';

// import userAtom from 'src/recoil/user';

// import { Fetcher } from 'src/utils';

import { Wrapper } from './style';

interface Props {
  onSelect: () => void;
  onClose: () => void;
}

function ReposModal({ onClose, onSelect }: Props) {
  // const user = useRecoilValue(userAtom);
  // eslint-disable-next-line no-unused-vars
  // const { data: repositories } = useQuery(['repositories', user._id], () =>
  //   Fetcher.getUserRepos(user),
  // );
  const handleOnConfirm = () => {
    onSelect();
  };

  return (
    <Wrapper>
      <ModalCommon
        onConfirm={handleOnConfirm}
        close='취소'
        confirm='확인'
        height={500}
        onClose={onClose}
      >
        <Col alignItems='center'>
          {/* {repositories.map((repository) => ( */}
          {/*  <>repository</> */}
          {/* ))} */}
        </Col>
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
