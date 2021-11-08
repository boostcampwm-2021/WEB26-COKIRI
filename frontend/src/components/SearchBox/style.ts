import styled from '@emotion/styled';

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 192px;
  height: 48px;
  padding: 0 32px;
  border-radius: 50px;
  background: #444444;
  box-shadow: inset 9px 9px 9px #3b3b3b, inset -9px -9px 9px #4d4d4d;
  input {
    border: none;
    width: 100px;
  }
  input:focus {
    outline: none;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
