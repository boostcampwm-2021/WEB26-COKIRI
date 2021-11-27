import styled from '@emotion/styled';

import { Col } from 'src/components/Grid';

const Wrapper = styled.div`
  ${Col} {
    width: 120px;
    margin: 0 8px;
  }
  img {
    border-radius: 24px;
  }
  width: 100%;
  margin-bottom: 16px;
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
