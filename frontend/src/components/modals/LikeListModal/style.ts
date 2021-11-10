import styled from '@emotion/styled';

import { Col, Row } from 'src/components/Grid';

const Wrapper = styled.div`
  ${Col} {
    ${Col} {
      overflow-y: scroll;
      height: 240px;
    }
    justify-content: start;
    width: 100%;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 100%;
  border-bottom: 1px solid #ffffff;
`;
// eslint-disable-next-line import/prefer-default-export
export { Wrapper, Title };
