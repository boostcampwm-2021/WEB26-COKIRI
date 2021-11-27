import styled from '@emotion/styled';

interface Props {
  count?: number;
  width: number;
  expanded?: boolean;
}

const Wrapper = styled.div<Props>`
  width: ${({ width, expanded }) => (expanded ? '100vh' : `${width}px`)};
  height: ${({ expanded }) => (expanded ? '100vh' : 'auto')};
  position: relative;
  margin: 12px 0;
  overflow: hidden;
`;

const ImageHolder = styled.ul<Props>`
  display: flex;
  list-style: none;
  transition: 0.5s ease-in-out;
  width: calc(
    ${({ count }) => count} * ${({ width, expanded }) => (expanded ? '100%' : `${width}px`)}
  );
  height: 100%;
  li {
    height: 100%;
    display: flex;
    align-items: center;
  }
  img {
    object-fit: ${({ expanded }) => (expanded ? 'contain' : 'cover')};
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
