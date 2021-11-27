import PropTypes from 'prop-types';
import Image from 'next/image';

import { DEFAULT_PROFILE_IMAGE_SIZE } from 'src/globals/constants';
import { DEFAULT_PROFILE_IMAGE } from 'src/globals/images';

import { Wrapper } from './style';

interface Props {
  profileImage?: string;
  size?: number;
  marginRight?: number;
  username: string;
}

function ProfileImage({ profileImage, size, marginRight, username }: Props) {
  return (
    <Wrapper size={size!} marginRight={marginRight!}>
      <Image src={profileImage!} width={size} height={size} alt={username} />
    </Wrapper>
  );
}

ProfileImage.propsType = {
  profileImage: PropTypes.string,
  size: PropTypes.number,
  marginRight: PropTypes.number,
  username: PropTypes.string,
};

ProfileImage.defaultProps = {
  profileImage: DEFAULT_PROFILE_IMAGE,
  size: DEFAULT_PROFILE_IMAGE_SIZE,
  marginRight: 0,
};

export default ProfileImage;
