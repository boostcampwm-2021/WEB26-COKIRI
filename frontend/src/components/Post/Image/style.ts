import styled from '@emotion/styled';

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  .disappear {
    display: none;
  }
`;

const ImageHolder = styled.ul`
  display: flex;
  list-style: none;
  transition: 0.5s ease-out;
  width: 2400px;
  li {
    width: 100%;
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
