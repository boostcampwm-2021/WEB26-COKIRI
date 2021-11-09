import styled from '@emotion/styled';

import { Button } from 'src/components/buttons/IconButton/style';
import { Col, Row } from 'src/components/Grid';

const Wrapper = styled.div`
  ${Button} {
    background: #1e1e1e;
    box-shadow: 3px 3px 6px #1a1a1a, -3px -3px 6px #232323;
    align-self: start;
    margin-bottom: 24px;
  }

  ${Row} {
    justify-content: start;
    ${Col} {
      justify-content: start;
      width: unset;
      margin-right: 16px;
      margin-bottom: 24px;
      img {
        border-radius: 16px;
      }
    }
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 164px;
  border: none;
  border-radius: 36px;
  padding: 24px;
  margin-bottom: 36px;
  background: #1e1e1e;
  box-shadow: inset 5px 5px 11px #1a1a1a, inset -5px -5px 11px #232323;
  resize: none;
  font-size: 16px;
`;

export { Textarea, Wrapper };
