import styled from '@emotion/styled';

interface Props {
  marginRight: number;
  width: number;
}

const Wrapper = styled.div<Props>`
  margin-right: ${({ marginRight }) => (marginRight === 0 ? 'unset' : `${marginRight}px`)};
  min-width: ${({ width }) => (width === 0 ? 'unset' : `${width}px`)};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  a {
    text-decoration: none;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
