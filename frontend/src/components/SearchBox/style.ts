import styled from '@emotion/styled';

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 192px;
  height: 48px;
  padding: 0 0 0 9px;
  border-radius: 50px;
  background: #444444;
  box-shadow: inset 6px 6px 14px #2f2f2f, inset -6px -6px 14px #595959;
  input {
    border: none;
  }
  input:focus {
    outline: none;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
