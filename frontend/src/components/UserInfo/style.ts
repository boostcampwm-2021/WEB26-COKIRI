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
  margin: 0 24px;
`;

const ImageHolder = styled.div`
  margin: 24px;
`;

export { Wrapper, Username, ImageHolder };
