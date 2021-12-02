import styled from '@emotion/styled';

import { ThemeType } from 'src/types';

interface Props {
  width: number;
  height: number;
  theme?: ThemeType;
}

const Wrapper = styled.div<Props>`
  margin: 48px;
  padding: 35px 30px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 14px 14px 27px #3a3a3a, -14px -14px 27px #4e4e4e;
  width: ${({ width }) => (width === 0 ? 'unset' : `${width}px`)};
  height: ${({ height }) => (height === 0 ? 'unset' : `${height}px`)};
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
