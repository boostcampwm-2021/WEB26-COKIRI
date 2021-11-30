import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import { BiSend, BiComment } from 'react-icons/bi';
import PropTypes from 'prop-types';

import InputCommon from 'src/components/inputs/Common';
import ProfileImage from 'src/components/images/ProfileImage';
import IconButton from 'src/components/buttons/IconButton';
import { Row } from 'src/components/Grid';

import {
  DEFAULT_COMMENT_INPUT_WIDTH,
  DEFAULT_BUTTON_PADDING,
  DEFAULT_ICON_SIZE,
} from 'src/globals/constants';

import userAtom from 'src/recoil/user';

import { CommentType } from 'src/types';

import { Fetcher } from 'src/utils';

interface Props {
  postID: string;
  // eslint-disable-next-line no-unused-vars
  onCommentWrite: (comment: CommentType) => void;
  width: number;
  iconSize: number;
  padding: number;
}

function CommentInput({ postID, onCommentWrite, width, iconSize, padding }: Props) {
  const user = useRecoilValue(userAtom);

  const [value, setValue] = useState('');
  const postPostComment = () => Fetcher.postPostComment(user, postID, value);
  const mutation = useMutation(postPostComment, {
    onSuccess: ({ data }) => onCommentWrite(data!),
  });

  const handleClick = () => {
    mutation.mutate();
    setValue('');
  };

  return (
    <Row justifyContent='center' alignItems='center'>
      <ProfileImage profileImage={user.profileImage} username={user.username!} />
      <InputCommon
        bind={[value, setValue]}
        width={width}
        icon={<BiComment />}
        title={`comment-${postID}`}
      />
      <IconButton onClick={handleClick} size={iconSize} padding={padding} title='comment-write'>
        <BiSend />
      </IconButton>
    </Row>
  );
}

CommentInput.propTypes = {
  postID: PropTypes.string.isRequired,
  onCommentWrite: PropTypes.func.isRequired,
  width: PropTypes.number,
  iconSize: PropTypes.number,
  padding: PropTypes.number,
};

CommentInput.defaultProps = {
  width: DEFAULT_COMMENT_INPUT_WIDTH,
  iconSize: DEFAULT_ICON_SIZE,
  padding: DEFAULT_BUTTON_PADDING,
};
export default CommentInput;
