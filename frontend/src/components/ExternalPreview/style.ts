import styled from '@emotion/styled';

const Wrapper = styled.div`
  position: relative;
  height: 100px;
  width: 360px;
  overflow-y: hidden;
  border-radius: 16px;
  padding: 16px;
`;
const Cover = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(13, 13, 13, 1));
`;

const LinkButton = styled.a`
  position: absolute;
  bottom: 20px;
  right: 0;
  left: 0;
  width: 80px;
  height: 40px;
  margin: auto;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 1px solid;
  }
`;

const ButtonHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export { Wrapper, Cover, LinkButton, ButtonHolder };
