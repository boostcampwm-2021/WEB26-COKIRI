import { useState } from 'react';
import PropTypes from 'prop-types';

import ButtonCommon from 'src/components/buttons/Common';
import FollowsModal from 'src/components/modals/FollowsModal';

interface Props {
  count: number;
  targetUserID: string;
}

function FollowsButton({ count, targetUserID }: Props) {
  const [isModalShow, setIsModalShow] = useState(false);

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <>
      {isModalShow && <FollowsModal targetUserID={targetUserID} onClose={switchIsModalShow} />}
      <ButtonCommon onClick={switchIsModalShow}>{count} follows</ButtonCommon>
    </>
  );
}

FollowsButton.protoTypes = {
  number: PropTypes.number.isRequired,
  targetUserID: PropTypes.string.isRequired,
};

export default FollowsButton;
