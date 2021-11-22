import styled from '@emotion/styled';

interface Props {
  size: number;
}

const Wrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  img {
    border-radius: ${({ size }) => size / 2}px;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
