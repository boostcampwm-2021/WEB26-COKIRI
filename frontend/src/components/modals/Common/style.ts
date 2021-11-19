import styled from '@emotion/styled';

interface Props {
  height: number;
}

const Background = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(4px) saturate(180%);
  -webkit-backdrop-filter: blur(4px) saturate(180%);
  background-color: rgba(35, 35, 35, 0.65);
`;

const Card = styled.div<Props>`
  position: fixed;
  z-index: 2;
  padding: 32px;
  top: 146px;
  left: 0;
  right: 0;
  height: ${({ height }) => (height === 0 ? 'unset' : `${height}px`)};
  width: 384px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 50px;
  background: #1e1e1e;
  box-shadow: 8px 8px 16px #1a1a1a, -8px -8px 16px #232323;

  button {
    background: #1e1e1e;
    box-shadow: 8px 8px 16px #1a1a1a, -8px -8px 16px #232323;
  }
`;

const Button = styled.button`
  margin: 0 24px;
  width: 96px;
  height: 48px;
  border-radius: 50px;
  background: #1e1e1e;
  box-shadow: 5px 5px 10px #1a1a1a, -5px -5px 10px #232323;
`;

const CloseButton = styled(Button)`
  background: #231e1e;
  box-shadow: 5px 5px 10px #1f1a1a, -5px -5px 10px #282323;
`;

const ConfirmButton = styled(Button)``;

export { Background, Card, CloseButton, ConfirmButton };
