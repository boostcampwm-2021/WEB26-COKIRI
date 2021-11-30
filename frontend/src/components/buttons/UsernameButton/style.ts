import styled from '@emotion/styled';

interface Props {
  width: number;
}

const Wrapper = styled.div<Props>`
  min-width: ${({ width }) => (width === 0 ? 'unset' : `${width}px`)};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 18px;
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
