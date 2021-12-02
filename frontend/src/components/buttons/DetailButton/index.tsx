import React from 'react';
import PropTypes from 'prop-types';
import { BsArrowsAngleExpand } from 'react-icons/bs';

import NavigateIconButton from 'src/components/buttons/NavigateIconButton';

interface Props {
  postID: string;
}

function DetailButton({ postID }: Props) {
  return (
    <NavigateIconButton href={`/posts/${postID}`} title='detail'>
      <BsArrowsAngleExpand />
    </NavigateIconButton>
  );
}

DetailButton.propTypes = {
  postID: PropTypes.string.isRequired,
};

export default DetailButton;
