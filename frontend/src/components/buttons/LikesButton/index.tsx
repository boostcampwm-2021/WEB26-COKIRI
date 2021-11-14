import PropTypes from 'prop-types';

import ButtonCommon from 'src/components/buttons/Common';
import React, { useCallback, useState } from 'react';
import LikesModal from 'src/components/modals/LikesModal';

interface Props {
  postID: string;
  likeCount: number;
}

function LikesButton({ postID, likeCount }: Props) {
  const [isModalShow, setIsModalShow] = useState(false);
  const handleClose = useCallback(() => setIsModalShow(false), []);
  const handleClick = useCallback(() => setIsModalShow(true), []);

  return (
    <>
      <ButtonCommon onClick={handleClick}>좋아요 {likeCount}개</ButtonCommon>
      {isModalShow && <LikesModal postID={postID} onClose={handleClose} />}
    </>
  );
}

LikesButton.propsType = {
  postID: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
};
export default LikesButton;
