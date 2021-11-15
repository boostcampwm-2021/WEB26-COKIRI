import styled from '@emotion/styled';

interface Props {
  size: number;
}

const Wrapper = styled.div<Props>`
  img {
    border-radius: ${({ size }) => size / 2}px;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
