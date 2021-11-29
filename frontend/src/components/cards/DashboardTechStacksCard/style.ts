import styled from '@emotion/styled';

import { DASHBOARD_STACK_TITLE_FONT_SIZE } from 'src/globals/constants';

interface Props {
  color: string;
}

const Title = styled.p`
  font-size: ${DASHBOARD_STACK_TITLE_FONT_SIZE}px;
`;

const Stack = styled.p<Props>`
  margin: 4px;
  background: ${({ color }) => color};
  border-radius: 20px;
  padding: 1px 8px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`;

export { Title, Stack, Field };
