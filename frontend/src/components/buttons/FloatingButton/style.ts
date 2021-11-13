import styled from '@emotion/styled';

import { Button } from 'src/components/buttons/Common/style';

const Wrapper = styled.div`
  ${Button} {
    position: fixed;
    right: 48px;
    bottom: 48px;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
