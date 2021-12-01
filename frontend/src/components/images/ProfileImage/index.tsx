import { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import SkeletonLoading from 'src/components/SkeletonLoading';

import { DEFAULT_PROFILE_IMAGE_SIZE } from 'src/globals/constants';
import { DEFAULT_PROFILE_IMAGE } from 'src/globals/images';

import { Wrapper } from './style';

interface Props {
  profileImage: string;
  size: number;
  username: string;
}

function ProfileImage({ profileImage, size, username }: Props) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const handleLoadingComplete = () => {
    setIsImageLoading(false);
  };

  const imageWidth = `${size}px`;
  const imageHeight = `${size}px`;

  return (
    <Wrapper size={size}>
      {isImageLoading && <SkeletonLoading circle width={imageWidth} height={imageHeight} />}
      <Image
        src={profileImage}
        width={size}
        height={size}
        alt={username}
        onLoadingComplete={handleLoadingComplete}
      />
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
