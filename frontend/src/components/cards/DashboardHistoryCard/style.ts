import styled from '@emotion/styled';

import { DASHBOARD_HISTORY_MARGIN_LEFT } from 'src/globals/constants';

const History = styled.div`
  margin-left: ${DASHBOARD_HISTORY_MARGIN_LEFT}px;
  border-left: 2px solid #ffffff;
`;

const HorizontalLine = styled.div`
  width: 300px;
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

const Title = styled.p`
  display: flex;
  align-items: center;
  font-size: 22px;
  margin-left: 32px;
  height: 76px;
`;

export { History, HorizontalLine, Section, Title };
