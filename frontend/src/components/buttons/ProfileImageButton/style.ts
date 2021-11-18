import styled from '@emotion/styled';

interface Props {
  size: number;
  marginRight: number;
  marginTop: number;
}

const Wrapper = styled.div<Props>`
  margin-right: ${({ marginRight }) => (marginRight === 0 ? 'unset' : `${marginRight}px`)};
  margin-top: ${({ marginTop }) => (marginTop === 0 ? 'unset' : `${marginTop}px`)};
  a {
    height: 36px;
  }
  img {
    border-radius: ${({ size }) => size / 2};
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
