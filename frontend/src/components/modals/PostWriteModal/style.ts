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
  margin-bottom: 24px;
  width: 48px;
  height: 48px;
`;

export { Textarea, IconHolder };
