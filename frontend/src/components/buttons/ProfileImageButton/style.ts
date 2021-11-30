import styled from '@emotion/styled';

interface Props {
  size: number;
}

const Wrapper = styled.div<Props>`
  min-height: ${({ size }) => (size === 0 ? 'unset' : `${size}px`)};
  min-width: ${({ size }) => (size === 0 ? 'unset' : `${size}px`)};
  a {
    height: 36px;
  }
  img {
    border-radius: ${({ size }) => size / 2};
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
