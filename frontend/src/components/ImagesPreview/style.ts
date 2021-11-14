import styled from '@emotion/styled';

import { Row } from 'src/components/Grid';

const Wrapper = styled.div`
  ${Row} {
    margin-bottom: 24px;
    img {
      border-radius: 24px;
    }
  }
  width: 100%;
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
