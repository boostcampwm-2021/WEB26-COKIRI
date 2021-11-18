import styled from '@emotion/styled';

interface Props {
  count?: number;
  width: number;
}

const Wrapper = styled.div<Props>`
  width: ${({ width }) => `${width}px`};
  position: relative;
  margin: 0 auto;
  overflow: hidden;
`;

const ImageHolder = styled.ul<Props>`
  display: flex;
  list-style: none;
  transition: 0.5s ease-in-out;
  width: ${({ count, width }) => count! * width}px;
  li {
    height: 100%;
  }
  img {
    background: #222222;
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
