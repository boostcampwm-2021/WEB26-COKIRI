import { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import { BiSend, BiComment } from 'react-icons/bi';
import PropTypes from 'prop-types';

import InputCommon from 'src/components/inputs/Common';
import ProfileImage from 'src/components/images/ProfileImage';
import IconButton from 'src/components/buttons/IconButton';
import { Row } from 'src/components/Grid';

import { COMMENT_INPUT_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';

import { CommentType } from 'src/types';

import { Fetcher } from 'src/utils';

interface Props {
  postID: string;
  setComments: Dispatch<SetStateAction<CommentType[]>>;
}

function CommentInput({ postID, setComments }: Props) {
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
      <InputCommon bind={[value, setValue]} width={COMMENT_INPUT_WIDTH} icon={<BiComment />} />
      <IconButton onClick={handleClick}>
        <BiSend />
      </IconButton>
    </Row>
  );
}

CommentInput.propTypes = {
  postID: PropTypes.string.isRequired,
  setComments: PropTypes.func.isRequired,
};

export default CommentInput;
