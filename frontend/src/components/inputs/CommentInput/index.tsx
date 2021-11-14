import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IoSendOutline } from 'react-icons/io5';

import InputCommon from 'src/components/inputs/Common';
import ProfileImageButton from 'src/components/buttons/ProfileImageButton';
import IconButton from 'src/components/buttons/IconButton';
import { Row } from 'src/components/Grid';

import userAtom from 'src/recoil/user';

function CommentInput() {
  const [value, setValue] = useState('');
  const user = useRecoilValue(userAtom);

  return (
    <Row justifyContent='center' alignItems='center'>
      <ProfileImageButton username={user.username} profileImage={user.profileImage} />
      <InputCommon bind={[value, setValue]} width={340} />
      <IconButton>
        <IoSendOutline />
      </IconButton>
    </Row>
  );
}

export default CommentInput;
