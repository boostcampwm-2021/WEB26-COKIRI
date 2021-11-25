import styled from '@emotion/styled';

import { ThemeType } from 'src/types';

interface Props {
  width: number;
  height: number;
  theme?: ThemeType;
}

const Background = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(4px) saturate(180%);
  -webkit-backdrop-filter: blur(4px) saturate(180%);
  background-color: rgba(35, 35, 35, 0.65);
`;

const Card = styled.div<Props>`
  position: fixed;
  z-index: 2;
  padding: 32px;
  top: 100px;
  left: 0;
  right: 0;
  height: ${({ height }) => (height === 0 ? 'unset' : `${height}px`)};
  width: ${({ width }) => width}px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 50px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 4px 4px 8px #3a3a3a, -4px -4px 8px #4e4e4e;
`;

const Title = styled.p`
  font-size: 18px;
`;

export { Background, Card, Title };
