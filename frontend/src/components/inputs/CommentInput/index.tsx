import { Dispatch, SetStateAction, useState } from 'react';
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
  setComments: Dispatch<SetStateAction<CommentType[]>>;
  width?: number;
  iconSize?: number;
  padding?: number;
}

function CommentInput({ postID, setComments, width, iconSize, padding }: Props) {
  const [value, setValue] = useState('');
  const user = useRecoilValue(userAtom);
  const postPostComment = () => Fetcher.postPostComment(user, postID, value);
  const mutation = useMutation(postPostComment, {
    onSuccess: ({ result }) => setComments((prevState: CommentType[]) => [...prevState, result]),
  });

  const handleClick = () => {
    mutation.mutate();
    setValue('');
  };

  return (
    <Row justifyContent='center' alignItems='center'>
      <ProfileImage profileImage={user.profileImage} />
      <InputCommon bind={[value, setValue]} width={width} icon={<BiComment />} />
      <IconButton onClick={handleClick} size={iconSize!} padding={padding!}>
        <BiSend />
      </IconButton>
    </Row>
  );
}

CommentInput.propTypes = {
  postID: PropTypes.string.isRequired,
  setComments: PropTypes.func.isRequired,
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
