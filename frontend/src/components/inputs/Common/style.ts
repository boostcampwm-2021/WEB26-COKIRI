import styled from '@emotion/styled';

import { ThemeType } from 'src/types';

interface Props {
  width?: number;
  theme?: ThemeType;
}

const Wrapper = styled.div<Props>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 24px;
  margin: 8px;
  width: ${({ width }) => (width !== 0 ? `${width}px` : 'unset')};
  height: 48px;
  border-radius: 50px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: inset 5px 5px 10px #3a3a3a, inset -5px -5px 10px #4e4e4e;
  svg {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 28px;
  }
`;

const Input = styled.input<Props>`
  width: ${({ width }) => (width !== 0 ? `${width}px` : 'unset')};
  font-size: 20px;
  background: ${({ theme }) => theme.colors.background};
`;

export { Wrapper, Input };
