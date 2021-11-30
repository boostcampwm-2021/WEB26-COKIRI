import { useState } from 'react';
import PropTypes from 'prop-types';

import ButtonCommon from 'src/components/buttons/Common';
import FollowersModal from 'src/components/modals/FollowersModal';

interface Props {
  count: number;
  targetUserID: string;
}

function FollowersButton({ count, targetUserID }: Props) {
  const [isModalShow, setIsModalShow] = useState(false);

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <>
      {isModalShow && <FollowersModal targetUserID={targetUserID} onClose={switchIsModalShow} />}
      <ButtonCommon onClick={switchIsModalShow} title='followers'>
        {count} followers
      </ButtonCommon>
    </>
  );
}

FollowersButton.propTypes = {
  count: PropTypes.number.isRequired,
  targetUserID: PropTypes.string.isRequired,
};

export default FollowersButton;
