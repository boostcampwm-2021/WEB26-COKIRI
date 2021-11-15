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
}

function ProfileImage({ profileImage }: Props) {
  return (
    <Wrapper>
      <Image
        src={profileImage!}
        width={POST_PROFILE_IMAGE_WIDTH}
        height={POST_PROFILE_IMAGE_HEIGHT}
      />
    </Wrapper>
  );
}

ProfileImage.propsType = {
  profileImage: PropTypes.string,
};

ProfileImage.defaultProps = {
  profileImage: DEFAULT_PROFILE_IMAGE,
};

export default ProfileImage;
