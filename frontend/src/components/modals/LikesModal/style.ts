import styled from '@emotion/styled';

import { Col } from 'src/components/Grid';

const Wrapper = styled.div`
  ${Col} {
    ${Col} {
      overflow-y: scroll;
      height: 240px;
    }
    justify-content: start;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
