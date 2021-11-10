import styled from '@emotion/styled';

import { Row } from 'src/components/Grid';

const Wrapper = styled.div`
  img {
    border-radius: 128px;
  }

  ${Row} {
    height: unset;
  }
`;

const Username = styled.p``;

export { Wrapper, Username };
