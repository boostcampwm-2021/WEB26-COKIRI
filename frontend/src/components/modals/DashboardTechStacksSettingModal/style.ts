import styled from '@emotion/styled';

interface Props {
  color: string;
}

const Label = styled.div`
  text-align: right;
  width: 164px;
  font-size: 24px;
  padding: 0 24px;
  margin: 8px;
`;

const Title = styled.p`
  text-align: center;
  width: 200px;
`;

const Content = styled.p<Props>`
  margin: 4px;
  background: ${({ color }) => color};
`;

export { Label, Title, Content };
