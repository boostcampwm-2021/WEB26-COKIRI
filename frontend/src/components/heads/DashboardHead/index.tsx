import PropTypes from 'prop-types';

import HeadCommon from 'src/components/heads/common';

interface Props {
  name: string;
  username: string;
  profileImage?: string;
}

function DashboardHead({ profileImage, username, name }: Props) {
  return (
    <HeadCommon
      title='COCOO 대쉬보드'
      image={profileImage}
      path={`/users/${username}/dashboard`}
      keywords={['개발자', '대쉬보드', '대시보드', '잔디', '깃허브']}
      description={`개발자의 SNS, ${name}의 대쉬보드`}
    />
  );
}

DashboardHead.propTypes = {
  username: PropTypes.string.isRequired,
  name: PropTypes.string,
  profileImage: PropTypes.string,
};

DashboardHead.defaultProps = {
  name: '개발자',
  profileImage: undefined,
};

export default DashboardHead;
