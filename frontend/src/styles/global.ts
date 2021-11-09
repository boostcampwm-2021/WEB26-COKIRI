import { css } from '@emotion/react';

export default css`
  * {
    color: #efefef;
    margin: 0;
    padding: 0;
  }

  html,
  main {
    background-color: #444444;
  }

  button {
    cursor: pointer;
    background: transparent;
    border: none;
  }

  input {
    border: none;
    background-color: transparent;
  }

  input:focus {
    outline: none;
  }
`;
