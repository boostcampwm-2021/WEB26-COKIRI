import styled from '@emotion/styled';

interface Props {
  width: number;
}

const Content = styled.p<Props>`
  width: ${({ width }) => width}px;
  word-wrap: break-word;
`;

// eslint-disable-next-line import/prefer-default-export
export { Content };
