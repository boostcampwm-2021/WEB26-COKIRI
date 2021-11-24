import styled from '@emotion/styled';

import { Col } from 'src/components/Grid';

import { POST_WIDTH } from 'src/globals/constants';

const Wrapper = styled.div`
  display: flex;
  justify-content: unset;
  > button {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1;
  }
`;

const ImageSection = styled.div`
  position: absolute;
  display: flex;
  left: 0;
  justify-content: center;
  align-items: center;
  background: #222222;
  width: calc(100vw - ${POST_WIDTH}px);
  height: 100vh;
`;

const PostInfoSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${POST_WIDTH}px;
  height: 100vh;
  ${Col} {
    height: 99vh;
  }
`;

export { Wrapper, ImageSection, PostInfoSection };
