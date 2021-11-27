import PropTypes from 'prop-types';

import HeadCommon from 'src/components/heads/common';

interface Props {
  bio: string;
  name: string;
  username: string;
  profileImage?: string;
}

function UserHead({ username, profileImage, name, bio }: Props) {
  return (
    <HeadCommon
      title='COCOO 프로필'
      image={profileImage}
      path={`/users/${username}`}
      keywords={[username, name, bio]}
      description={`개발자의 SNS, ${username}님의 프로필`}
    />
  );
}

UserHead.propTypes = {
  bio: PropTypes.string,
  name: PropTypes.string,
  username: PropTypes.string.isRequired,
  profileImage: PropTypes.string,
};

UserHead.defaultProps = {
  bio: 'COCOO',
  name: '개발자',
  profileImage: undefined,
};

export default UserHead;
