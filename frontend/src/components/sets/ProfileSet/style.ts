import styled from '@emotion/styled';

interface Props {
  marginLeft: number;
}
const Wrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  height: 50px;
  margin-left: ${({ marginLeft }) => (marginLeft === 0 ? 'unset' : `${marginLeft}px`)};
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
