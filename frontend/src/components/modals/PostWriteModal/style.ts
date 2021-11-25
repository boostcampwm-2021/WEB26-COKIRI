import styled from '@emotion/styled';

const Textarea = styled.textarea`
  width: 360px;
  height: 164px;
  border-radius: 36px;
  padding: 24px;
  margin: 24px 0;
  background: #444444;
  box-shadow: inset 5px 5px 10px #3a3a3a, inset -5px -5px 10px #4e4e4e;
  resize: none;
  font-size: 16px;
`;

const IconHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #444444;
  box-shadow: 4px 4px 8px #3a3a3a, -4px -4px 8px #4e4e4e;
  margin: 0 12px;
`;

export { Textarea, IconHolder };
