import styled from '@emotion/styled';

const Wrapper = styled.div`
  position: absolute;
  z-index: 3;
`;

const Problems = styled.div`
  height: 200px;
  overflow-y: scroll;
  padding: 16px;
`;

const Title = styled.p`
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 1.8em;
  line-height: 1.8em;
`;

export { Wrapper, Problems, Title };
