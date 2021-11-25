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
  align-self: start;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #444444;
  box-shadow: 11px 11px 21px #3a3a3a, -11px -11px 21px #4e4e4e;
  margin-right: 12px;
`;

export { Textarea, IconHolder };
