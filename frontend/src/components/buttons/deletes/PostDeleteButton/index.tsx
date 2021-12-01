import PropTypes from 'prop-types';
import { IoCloseCircleOutline } from 'react-icons/io5';

import IconButton from 'src/components/buttons/IconButton';

interface Props {
  postID: string;
  onPostDelete: Function;
}

function PostDeleteButton({ postID, onPostDelete }: Props) {
  return (
    <IconButton onClick={() => onPostDelete(postID)} title='post-delete'>
      <IoCloseCircleOutline />
    </IconButton>
  );
}

PostDeleteButton.propTypes = {
  postID: PropTypes.string.isRequired,
  onPostDelete: PropTypes.func.isRequired,
};

export default PostDeleteButton;
