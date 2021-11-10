import styled from '@emotion/styled';

const Wrapper = styled.div`
  background: #1e1e1e;
  box-shadow: 5px 5px 10px #1a1a1a, -5px -5px 10px #232323;
  align-self: start;
  margin-bottom: 24px;
  width: 48px;
  height: 48px;
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    input {
      box-shadow: none;
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
