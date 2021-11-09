import styled from '@emotion/styled';

const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px) saturate(180%);
  -webkit-backdrop-filter: blur(4px) saturate(180%);
  background-color: rgba(35, 35, 35, 0.65);
`;

const Card = styled.div`
  position: absolute;
  padding: 32px;
  top: 196px;
  left: 0;
  right: 0;
  width: 384px;
  height: 192px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 50px;
  background: #1e1e1e;
  box-shadow: 8px 8px 16px #1a1a1a, -8px -8px 16px #232323;
  input {
    padding: 0 24px;
    height: 36px;
    width: 256px;
    border-radius: 50px;
    background: #1e1e1e;
    box-shadow: inset 8px 8px 16px #1a1a1a, inset -8px -8px 16px #232323;
  }
`;

const Button = styled.button`
  color: #cccccc;
  margin: 0 24px;
  width: 96px;
  height: 48px;
  border-radius: 50px;
  background: #1e1e1e;
  box-shadow: 5px 5px 10px #1a1a1a, -5px -5px 10px #232323;
`;

const CloseButton = styled(Button)``;

const ConfirmButton = styled(Button)``;

export { Background, Card, CloseButton, ConfirmButton };
