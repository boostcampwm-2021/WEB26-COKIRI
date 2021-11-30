import PropTypes from 'prop-types';
import Image from 'next/image';

import { DEFAULT_PROFILE_IMAGE_SIZE } from 'src/globals/constants';
import { DEFAULT_PROFILE_IMAGE } from 'src/globals/images';

import { Wrapper } from './style';

interface Props {
  profileImage: string;
  size: number;
  username: string;
}

function ProfileImage({ profileImage, size, username }: Props) {
  return (
    <Wrapper size={size}>
      <Image src={profileImage} width={size} height={size} alt={username} />
    </Wrapper>
  );
}

ProfileImage.propTypes = {
  profileImage: PropTypes.string,
  size: PropTypes.number,
  username: PropTypes.string.isRequired,
};

ProfileImage.defaultProps = {
  profileImage: DEFAULT_PROFILE_IMAGE,
  size: DEFAULT_PROFILE_IMAGE_SIZE,
};

export default ProfileImage;
