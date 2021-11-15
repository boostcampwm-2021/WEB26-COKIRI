import PropTypes from 'prop-types';
import Image from 'next/image';

import { DEFAULT_PROFILE_IMAGE, DEFAULT_PROFILE_IMAGE_SIZE } from 'src/globals/constants';

import { Wrapper } from './style';

interface Props {
  profileImage?: string;
  size?: number;
}

function ProfileImage({ profileImage, size }: Props) {
  return (
    <Wrapper size={size!}>
      <Image src={profileImage!} width={size} height={size} />
    </Wrapper>
  );
}

ProfileImage.propsType = {
  profileImage: PropTypes.string,
  size: PropTypes.number,
};

ProfileImage.defaultProps = {
  profileImage: DEFAULT_PROFILE_IMAGE,
  size: DEFAULT_PROFILE_IMAGE_SIZE,
};

export default ProfileImage;
