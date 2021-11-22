import React from 'react';
import PropTypes from 'prop-types';
import { BsArrowsAngleExpand } from 'react-icons/bs';

import NavigateButton from 'src/components/buttons/NavigateIconButton';

interface Props {
  postID: string;
}

function DetailButton({ postID }: Props) {
  return (
    <NavigateButton href={`/posts/${postID}`}>
      <BsArrowsAngleExpand />
    </NavigateButton>
  );
}

DetailButton.propsType = {
  postID: PropTypes.string.isRequired,
};

export default DetailButton;
