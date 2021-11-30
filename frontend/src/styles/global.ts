import { css } from '@emotion/react';

import { ThemeType } from 'src/types';

const global = (theme: ThemeType) => css`
  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 30px;
    background: #444444;
    box-shadow: inset 3px 3px 6px #3a3a3a, inset -3px -3px 6px #4e4e4e;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  @font-face {
    font-family: 'IBMPlexSansKR-Regular';
    src: local('IBMPlexSansKR-Regular'), url('/fonts/IBMPlexSansKR-Regular.woff2') format('woff2'),
      url('/fonts/IBMPlexSansKR-Regular.woff') format('woff'),
      url('/fonts/IBMPlexSansKR-Regular.ttf') format('truetype'),
      url('/fonts/IBMPlexSansKR-Regular.eot') format('embedded-opentype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    font-family: 'IBMPlexSansKR-Regular';
    color: #efefef;
    margin: 0;
    padding: 0;
  }

  html,
  main {
    overflow-y: scroll;
    background-color: ${theme.colors.background};
  }

  button {
    cursor: pointer;
    background: ${theme.colors.background};
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
