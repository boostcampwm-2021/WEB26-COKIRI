import Image from 'next/image';
import { useIsFetching } from 'react-query';

import { Wrapper } from './style';

function LoadingIndicator() {
  const isFetching = useIsFetching();

  return isFetching ? (
    <Wrapper>
      <Image src='/images/loading_image.gif' width={200} height={200} />
    </Wrapper>
  ) : null;
}

export default LoadingIndicator;
