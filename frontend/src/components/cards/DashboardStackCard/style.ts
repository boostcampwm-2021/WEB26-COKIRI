import styled from '@emotion/styled';

import { DASHBOARD_STACK_TITLE_FONT_SIZE } from 'src/globals/constants';

interface Props {
  color: string;
}

const Title = styled.p`
  font-size: ${DASHBOARD_STACK_TITLE_FONT_SIZE}px;
`;

const Stack = styled.p<Props>`
  background: ${({ color }) => color};
`;

export { Title, Stack };
