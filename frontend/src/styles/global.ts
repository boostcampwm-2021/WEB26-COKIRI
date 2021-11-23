import { css } from '@emotion/react';

import { ThemeType } from 'src/types';

const global = (theme: ThemeType) => css`
  * {
    color: #efefef;
    margin: 0;
    padding: 0;
  }

  html,
  main {
    background-color: ${theme.colors.background};
  }

  button {
    cursor: pointer;
    background: transparent;
    border: none;
  }

  input,
  Textarea {
    border: none;
  }

  input:focus,
  textarea:focus {
    outline: none;
  }

  img {
    object-fit: cover;
  }

  a {
    text-decoration: none;
  }
`;

export default global;
