import styled from '@emotion/styled';

import { NAVIGATE_BUTTON_PADDING } from 'src/globals/constants';

interface Props {
  width?: number;
  height?: number;
  margin?: number;
  padding?: number;
  plain?: boolean;
  hidden?: boolean;
}

const Button = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width === 0 ? 'unset' : `${width}px`)};
  height: ${({ height }) => (height === 0 ? 'unset' : `${height}px`)};
  margin: ${({ margin }) => (margin ? `${margin}px` : 0)};
  padding: ${({ padding }) => (padding ? `${padding}px` : 0)};
  border-radius: 50px;
  box-shadow: ${({ plain }) => (plain ? 'unset' : '5px 5px 10px #3a3a3a, -5px -5px 10px #4e4e4e')};
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'unset')};
  white-space: nowrap;

  a {
    padding: ${({ plain }) => (plain ? 0 : `${NAVIGATE_BUTTON_PADDING}px`)};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Button };
