import styled from '@emotion/styled';

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 192px;
  height: 48px;
  padding: 0 24px 0 32px;
  margin: 16px;
  border-radius: 50px;
  background: #444444;
  box-shadow: inset 9px 9px 9px #3b3b3b, inset -9px -9px 9px #4d4d4d;
  input {
    width: 100px;
    font-size: 16px;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
