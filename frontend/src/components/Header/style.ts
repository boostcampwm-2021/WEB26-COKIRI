import styled from '@emotion/styled';

import { ThemeType } from 'src/types';

interface Props {
  theme?: ThemeType;
}

const Wrapper = styled.header<Props>`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;

  // @TODO scroll 이 내려갔을 때만 보더보이게 하기
  &:not([data-scroll='0']) {
    border-bottom: 1px solid #3e3e3e;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
`;

export { Wrapper, Section };
