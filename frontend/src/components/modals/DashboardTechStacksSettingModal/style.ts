import styled from '@emotion/styled';

interface Props {
  color: string;
}

const Label = styled.div`
  text-align: right;
  width: 80px;
  font-size: 24px;
  padding: 0 24px;
  margin: 8px;
`;

const Stacks = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Stack = styled.p<Props>`
  margin: 4px;
  background: ${({ color }) => color};
  border-radius: 20px;
  padding: 1px 8px;
`;

export { Label, Stacks, Stack };
