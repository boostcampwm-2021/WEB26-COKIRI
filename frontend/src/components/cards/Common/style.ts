import styled from '@emotion/styled';

interface Props {
  width: number;
  height: number;
}

const Wrapper = styled.div<Props>`
  margin: 32px 32px;
  padding: 7px;
  border-radius: 50px;
  background: #444444;
  box-shadow: 14px 14px 27px #3a3a3a, -14px -14px 27px #4e4e4e;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
