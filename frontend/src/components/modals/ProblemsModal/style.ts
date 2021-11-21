import styled from '@emotion/styled';
import { Col } from 'src/components/Grid';

const Wrapper = styled.div`
  position: absolute;
  z-index: 3;
  ${Col} {
    height: 400px;
    overflow: scroll;
    margin: 24px 0;
  }
`;

const Problem = styled.div`
  padding: 16px;
`;

const Title = styled.p`
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 1.8em;
  line-height: 1.8em;
`;

export { Wrapper, Problem, Title };
