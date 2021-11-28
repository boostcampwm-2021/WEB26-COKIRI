import { css } from '@emotion/react';

import { ThemeType } from 'src/types';

const global = (theme: ThemeType) => css`
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 30px;
    background: rgb(67, 67, 67);
    box-shadow: inset 2px 2px 2px rgba(255, 255, 255, 0.25), inset -2px -2px 2px rgba(0, 0, 0, 0.25);
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
