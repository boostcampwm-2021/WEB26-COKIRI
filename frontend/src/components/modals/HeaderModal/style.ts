import styled from '@emotion/styled';

import { ThemeType } from 'src/types';

interface Props {
  theme?: ThemeType;
  right: boolean;
  width: number;
}

const Wrapper = styled.div<Props>`
  position: fixed;
  top: 78px;
  left: ${({ right }) => (right ? 'unset' : 0)};
  right: ${({ right }) => (right ? 0 : 'unset')};
  width: ${({ width }) => `${width}px`};
  height: 300px;
  overflow-y: scroll;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid #3e3e3e;
  border-left: 1px solid #3e3e3e;
  border-right: 1px solid #3e3e3e;
  border-bottom-left-radius: ${({ right }) => (right ? '50px' : 'unset')};
  border-bottom-right-radius: ${({ right }) => (right ? 'unset' : '50px')};
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
