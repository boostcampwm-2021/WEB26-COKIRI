import styled from '@emotion/styled';

const Wrapper = styled.div`
  p {
    margin: 0 6px;
  }
  button {
    margin: 0 16px;
  }
`;

const Username = styled.p`
  font-size: 36px;
  padding: 0 12px 0 0;
`;

const ImageHolder = styled.div`
  margin: 0 12px 0 24px;
  min-height: 128px;
  min-width: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 64px;
  overflow: hidden;
`;

export { Wrapper, Username, ImageHolder };
