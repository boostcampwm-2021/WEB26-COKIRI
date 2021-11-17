import styled from '@emotion/styled';

import { ThemeType } from 'src/types';

interface Props {
  theme?: ThemeType;
  left: boolean;
  right: boolean;
}

const Wrapper = styled.div<Props>`
  position: fixed;
  top: 78px;
  left: ${({ left }) => (left ? 0 : 'unset')};
  right: ${({ right }) => (right ? 0 : 'unset')};
  width: 350px;
  height: 300px;
  overflow-y: scroll;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid #3e3e3e;
  border-left: 1px solid #3e3e3e;
  border-right: 1px solid #3e3e3e;
  border-bottom-left-radius: ${({ left }) => (left ? 'unset' : '50px')};
  border-bottom-right-radius: ${({ right }) => (right ? 'unset' : '50px')};
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
