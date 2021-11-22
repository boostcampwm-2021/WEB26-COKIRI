import styled from '@emotion/styled';

interface Props {
  width: number;
}

const Wrapper = styled.div<Props>`
  margin: 16px;
  width: ${({ width }) => `${width}px`};
`;

const Content = styled.p`
  word-wrap: break-word;
`;

export { Wrapper, Content };
