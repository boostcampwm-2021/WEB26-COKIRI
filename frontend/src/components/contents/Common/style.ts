import styled from '@emotion/styled';

import { POST_CONTENT_WIDTH } from 'src/globals/constants';

const Wrapper = styled.div`
  margin: 16px;
  width: ${POST_CONTENT_WIDTH};
`;

const Content = styled.p`
  word-wrap: break-word;
`;

export { Wrapper, Content };
