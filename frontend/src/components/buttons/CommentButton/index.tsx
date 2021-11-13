import React from 'react';
import PropTypes from 'prop-types';
import { IoChatbubbleOutline } from 'react-icons/io5';

import IconButton from 'src/components/buttons/IconButton';

interface Props {
  postID: string;
}

// eslint-disable-next-line no-unused-vars
function CommentButton({ postID }: Props) {
  return (
    <IconButton>
      <IoChatbubbleOutline />
    </IconButton>
  );
}

CommentButton.propsType = {
  postID: PropTypes.string.isRequired,
};

export default CommentButton;
