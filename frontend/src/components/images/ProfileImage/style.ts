import styled from '@emotion/styled';

interface Props {
  size: number;
}

const Wrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  overflow: hidden;
  img {
    min-height: ${({ size }) => size}px;
    min-width: ${({ size }) => size}px;
    border-radius: ${({ size }) => size / 2}px;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
