import PropTypes from 'prop-types';
import Image from 'next/image';

import {
  DEFAULT_PROFILE_IMAGE,
  POST_PROFILE_IMAGE_HEIGHT,
  POST_PROFILE_IMAGE_WIDTH,
} from 'src/globals/constants';

import { Wrapper } from './style';

interface Props {
  profileImage?: string;
  width?: number;
  height?: number;
}

function ProfileImage({ profileImage, width, height }: Props) {
  return (
    <Wrapper width={width!}>
      <Image src={profileImage!} width={width} height={height} />
    </Wrapper>
  );
}

ProfileImage.propsType = {
  profileImage: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

ProfileImage.defaultProps = {
  profileImage: DEFAULT_PROFILE_IMAGE,
  width: POST_PROFILE_IMAGE_WIDTH,
  height: POST_PROFILE_IMAGE_HEIGHT,
};

export default ProfileImage;
