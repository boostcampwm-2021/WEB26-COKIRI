import styled from '@emotion/styled';

import { Row } from 'src/components/Grid';

const Wrapper = styled.div`
  padding: 50px 0;
  ${Row} {
    height: unset;
  }
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  height: 64px;
  div {
    margin: 0 5px 0 10px;
  }
`;

export { Wrapper, Buttons };
