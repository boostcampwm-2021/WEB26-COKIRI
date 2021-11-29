import styled from '@emotion/styled';

import { DASHBOARD_HISTORY_MARGIN_LEFT } from 'src/globals/constants';

const History = styled.div`
  margin-left: ${DASHBOARD_HISTORY_MARGIN_LEFT}px;
  border-left: 2px solid #ffffff;
`;

const HorizontalLine = styled.div`
  width: 200px;
  border-bottom: 1px solid #ffffff;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  p {
    padding: 8px;
    word-wrap: break-word;
  }
`;

export { History, HorizontalLine, Section };
