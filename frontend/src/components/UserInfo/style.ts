import styled from '@emotion/styled';

import { Row, Col } from 'src/components/Grid';

const Wrapper = styled.div`
  p {
    margin: 0 6px;
  }
  img {
    border-radius: 128px;
  }
  button {
    margin: 0 16px;
  }

  ${Row} {
    ${Col} {
      height: 80%;
    }
  }
`;

const Username = styled.p`
  font-size: 36px;
  padding: 0 12px 0 0;
`;

const ImageHolder = styled.div`
  margin: 24px;
`;

export { Wrapper, Username, ImageHolder };
