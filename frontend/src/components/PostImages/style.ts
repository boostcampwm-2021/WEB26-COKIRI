import styled from '@emotion/styled';

import { IMAGE_WIDTH } from 'src/globals/constants';

interface Props {
  count: number;
}
const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
`;

const ImageHolder = styled.ul<Props>`
  display: flex;
  list-style: none;
  transition: 0.5s ease-in-out;
  width: ${({ count }) => count * IMAGE_WIDTH}px;
  li {
    height: 100%;
  }
  img {
    background: #555555;
  }
`;

const SlideButtons = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  top: 50%;
  height: 28px;
`;
export { Wrapper, ImageHolder, SlideButtons };
