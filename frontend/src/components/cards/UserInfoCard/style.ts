import styled from '@emotion/styled';

import { Row, Col } from 'src/components/Grid';

const Wrapper = styled.div`
  p {
    margin: 0 6px;
  }
  button {
    margin: 0 16px;
  }
  ${Row} {
    ${Col} {
      width: unset;
      height: 80%;
    }
  }
`;

const Username = styled.p`
  font-size: 36px;
  padding: 0 12px 0 0;
`;

const ImageHolder = styled.div`
  margin: 0 12px 0 24px;
  height: 128px;
  width: 128px;
  border-radius: 64px;
  overflow: hidden;
`;

export { Wrapper, Username, ImageHolder };
