import styled from '@emotion/styled';

import { NAVIGATE_BUTTON_PADDING } from 'src/globals/constants';

interface Props {
  width: number;
  height: number;
  margin: number;
  padding: number;
  plain: boolean;
  hidden: boolean;
  clicked: boolean;
  disabled: boolean;
  red: boolean;
  green: boolean;
}

const redShadow = '5px 5px 10px #443a3a, -5px -5px 10px #504e4e';
const greenShadow = '5px 5px 10px #3a3f3a, -5px -5px 10px #4e554e';
const normalShadow = '5px 5px 10px #3a3a3a, -5px -5px 10px #4e4e4e';

const Button = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width === 0 ? 'unset' : `${width}px`)};
  height: ${({ height }) => (height === 0 ? 'unset' : `${height}px`)};
  margin: ${({ margin }) => (margin ? `${margin}px` : 0)};
  padding: ${({ padding }) => (padding ? `${padding}px` : 0)};
  border-radius: 50px;
  box-shadow: ${({ clicked, disabled, plain, red, green }) => {
    if (clicked) {
      return 'inset 4px 4px 8px #3a3a3a, inset -4px -4px 8px #4e4e4e;';
    }
    if (plain || disabled) {
      return 'unset';
    }
    if (red) {
      return redShadow;
    }
    if (green) {
      return greenShadow;
    }
    return normalShadow;
  }};
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'unset')};
  white-space: nowrap;

  a {
    padding: ${({ plain }) => (plain ? 0 : `${NAVIGATE_BUTTON_PADDING}px`)};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    width: 100%;
    height: 100%;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Button };
