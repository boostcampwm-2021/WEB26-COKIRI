import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'src/components/buttons/IconButton';
import { IoPaperPlaneOutline } from 'react-icons/io5';

interface Props {
  postID: string;
}

// eslint-disable-next-line no-unused-vars
function EchoButton({ postID }: Props) {
  return (
    <IconButton>
      <IoPaperPlaneOutline />
    </IconButton>
  );
}

EchoButton.propsType = {
  postID: PropTypes.string.isRequired,
};

export default EchoButton;
