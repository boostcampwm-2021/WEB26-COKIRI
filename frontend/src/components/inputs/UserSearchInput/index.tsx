import { useState } from 'react';
import { useMutation } from 'react-query';
import { IoSearchSharp } from 'react-icons/io5';

import InputCommon from 'src/components/inputs/Common';
import HeaderModal from 'src/components/modals/HeaderModal';
import FollowSet from 'src/components/sets/FollowSet';
import ProfileSet from 'src/components/sets/ProfileSet';
import { Row } from 'src/components/Grid';

import { SEARCH_INPUT_WIDTH } from 'src/globals/constants';

import { Fetcher } from 'src/utils';

import { UserType } from 'src/types';

import { Background } from './style';

function UserSearchInput() {
  const [value, setValue] = useState('');
  const [userResults, setUserResults] = useState<UserType[]>([]);
  const mutation = useMutation((newValue: string) => Fetcher.getSearch(newValue));

  const handleChange = async (newValue: string) => {
    if (newValue.trim() !== '') {
      const results = await mutation.mutateAsync(newValue.trim());
      setUserResults(results);
    } else {
      setUserResults([]);
    }
  };

  const handleBackgroundClick = () => {
    setValue('');
    setUserResults([]);
  };

  return (
    <>
      {value !== '' && <Background onClick={handleBackgroundClick} />}
      {userResults.length !== 0 && (
        <HeaderModal>
          {userResults.map(({ _id, username, profileImage }) => (
            <Row key={_id} justifyContent='space-between' alignItems='center'>
              <Row alignItems='center'>
                <ProfileSet username={username!} profileImage={profileImage} />
              </Row>
              <FollowSet targetUserID={_id!} />
            </Row>
          ))}
        </HeaderModal>
      )}
      <InputCommon
        bind={[value, setValue]}
        placeholder='search'
        width={SEARCH_INPUT_WIDTH}
        icon={<IoSearchSharp />}
        onChange={handleChange}
      />
    </>
  );
}

export default UserSearchInput;
