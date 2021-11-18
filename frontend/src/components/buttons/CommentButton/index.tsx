import React from 'react';
import PropTypes from 'prop-types';
import { IoChatbubbleOutline } from 'react-icons/io5';

import NavigateButton from 'src/components/buttons/NavigateIconButton';

interface Props {
  postID: string;
}

// eslint-disable-next-line no-unused-vars
function CommentButton({ postID }: Props) {
  return (
    <NavigateButton href={`/posts/${postID}`}>
      <IoChatbubbleOutline />
    </NavigateButton>
  );
}

CommentButton.propsType = {
  postID: PropTypes.string.isRequired,
};

export default CommentButton;
