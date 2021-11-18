import styled from '@emotion/styled';

interface Props {
  width: number;
}

const Wrapper = styled.div<Props>`
  margin: 16px;
  width: ${({ width }) => `${width}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
