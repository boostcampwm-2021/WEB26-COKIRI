import styled from '@emotion/styled';

import { ThemeType } from 'src/types';

interface Props {
  theme?: ThemeType;
}

const Label = styled.div`
  text-align: right;
  width: 164px;
  font-size: 24px;
  padding: 0 24px;
  margin: 8px;
`;

const ImageCover = styled.div<Props>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  float: left;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.background};
  width: 168px;
  height: 168px;
  opacity: 0.6;
  font-size: 18px;
`;

const ImageHolder = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  margin: 24px;
  border-radius: 84px;
  height: 168px;
  width: 168px;
`;

export { Label, ImageHolder, ImageCover };
