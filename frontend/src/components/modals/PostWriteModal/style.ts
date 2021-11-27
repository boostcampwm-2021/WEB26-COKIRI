import styled from '@emotion/styled';

const Textarea = styled.textarea`
  width: 360px;
  height: 164px;
  border-radius: 36px;
  padding: 24px;
  margin: 16px 0;
  background: #444444;
  box-shadow: inset 5px 5px 10px #3a3a3a, inset -5px -5px 10px #4e4e4e;
  resize: none;
  font-size: 16px;
`;

const ImageInputHolder = styled.div`
  border-radius: 18px;
  background: #444444;
  box-shadow: 4px 4px 8px #3a3a3a, -4px -4px 8px #4e4e4e;
  margin: 8px;

  p {
    font-size: 12px;
    margin-left: 4px;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 52px;
  }
`;

export { Textarea, ImageInputHolder };
