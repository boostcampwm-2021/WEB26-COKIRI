import styled from '@emotion/styled';

interface Props {
  marginRight: number;
}

const Wrapper = styled.div<Props>`
  margin-right: ${({ marginRight }) => (marginRight === 0 ? 'unset' : `${marginRight}px`)};
  a {
    text-decoration: none;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
