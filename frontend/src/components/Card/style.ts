import styled from '@emotion/styled';

interface Props {
  width: number;
  height: number;
}

const Wrapper = styled.div<Props>`
  border-radius: 50px;
  background: #444444;
  box-shadow: 20px 20px 60px #3a3a3a, -20px -20px 60px #4e4e4e;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

export default Wrapper;
