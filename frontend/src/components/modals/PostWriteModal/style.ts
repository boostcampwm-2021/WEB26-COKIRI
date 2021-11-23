import styled from '@emotion/styled';

const Textarea = styled.textarea`
  width: 100%;
  height: 164px;
  border: none;
  border-radius: 36px;
  padding: 24px;
  margin-bottom: 36px;
  background: #1e1e1e;
  box-shadow: inset 5px 5px 11px #1a1a1a, inset -5px -5px 11px #232323;
  resize: none;
  font-size: 16px;
`;

const IconHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1e1e1e;
  box-shadow: 5px 5px 10px #1a1a1a, -5px -5px 10px #232323;
  align-self: start;
  width: 48px;
  height: 48px;
`;

const Preview = styled.div`
  position: relative;
  height: 100px;
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
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(18, 18, 18, 1));
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

export { Textarea, IconHolder, Preview, Cover, LinkButton };
