import styled from '@emotion/styled';

import { DASHBOARD_HISTORY_MARGIN_LEFT } from 'src/globals/constants';

const History = styled.div`
  margin-left: ${DASHBOARD_HISTORY_MARGIN_LEFT}px;
  border-left: 2px solid #ffffff;
  p {
    padding: 16px 8px;
    word-wrap: break-word;
  }
`;

const HorizentalLine = styled.div`
  width: 70%;
  border-bottom: 1px solid #ffffff;
`;

export { History, HorizentalLine };
