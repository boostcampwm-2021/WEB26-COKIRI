import styled from '@emotion/styled';

interface Props {
  width: number;
}

const Title = styled.p`
  font-size: 22px;
  margin: 0 0 0 16px;
  padding: 16px;
`;

const Contents = styled.div<Props>`
  width:${({ width }) => width}px
  display: flex;
  flex-direction: column;
  width: 680px;
`;

export { Title, Contents };
