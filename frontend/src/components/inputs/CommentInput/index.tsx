import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BiSend, BiComment } from 'react-icons/bi';

import InputCommon from 'src/components/inputs/Common';
import ProfileImage from 'src/components/images/ProfileImage';
import IconButton from 'src/components/buttons/IconButton';
import { Row } from 'src/components/Grid';

import { COMMENT_INPUT_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';

function CommentInput() {
  const [value, setValue] = useState('');
  const user = useRecoilValue(userAtom);

  return (
    <Row justifyContent='center' alignItems='center'>
      <ProfileImage profileImage={user.profileImage} />
      <InputCommon bind={[value, setValue]} width={COMMENT_INPUT_WIDTH} icon={<BiComment />} />
      <IconButton>
        <BiSend />
      </IconButton>
    </Row>
  );
}

export default CommentInput;
